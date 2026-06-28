import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity";
import { Vendor } from "../vendors/entities/vendor.entity";
import {
  CreateReviewDto,
  ModerationDto,
  ReviewResponseDto,
  ReviewStatus,
} from "./dto/review.dto";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
    @InjectRepository(Vendor) private readonly vendorRepo: Repository<Vendor>,
  ) {}

  private toDto(r: Review): ReviewResponseDto {
    return {
      id: r.id,
      vendorId: r.vendorId,
      coupleId: r.coupleId,
      bookingId: r.bookingId,
      overallRating: r.overallRating,
      communicationRating: r.communicationRating,
      valueRating: r.valueRating,
      comment: r.comment,
      status: r.status,
      vendorReply: r.vendorReply,
      createdAt: r.createdAt,
    };
  }

  async create(
    coupleId: string,
    dto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    const existing = await this.reviewRepo.findOne({
      where: { coupleId, vendorId: dto.vendorId },
    });
    if (existing)
      throw new BadRequestException("You have already reviewed this vendor");

    const review = this.reviewRepo.create({
      coupleId,
      vendorId: dto.vendorId,
      bookingId: dto.bookingId,
      overallRating: dto.overallRating,
      communicationRating: dto.communicationRating,
      valueRating: dto.valueRating,
      comment: dto.comment,
      status: ReviewStatus.PENDING,
    });
    const saved = await this.reviewRepo.save(review);
    return this.toDto(saved);
  }

  async findByVendor(vendorId: string, page: number, limit: number) {
    const [data, total] = await this.reviewRepo.findAndCount({
      where: { vendorId, status: ReviewStatus.APPROVED },
      order: { createdAt: "DESC" },
      skip: (+page - 1) * +limit,
      take: +limit,
    });
    return {
      data: data.map(this.toDto.bind(this)),
      total,
      page: +page,
      limit: +limit,
    };
  }

  async findLatest(limit = 6) {
    const reviews = await this.reviewRepo.find({
      where: { status: ReviewStatus.APPROVED },
      order: { createdAt: "DESC" },
      take: limit,
    });
    return reviews.map(this.toDto.bind(this));
  }

  async findPending(page: number, limit: number) {
    const [data, total] = await this.reviewRepo.findAndCount({
      where: { status: ReviewStatus.PENDING },
      order: { createdAt: "DESC" },
      skip: (+page - 1) * +limit,
      take: +limit,
    });
    return { data: data.map(this.toDto.bind(this)), total };
  }

  async moderate(
    reviewId: string,
    dto: ModerationDto,
  ): Promise<ReviewResponseDto> {
    const review = await this.reviewRepo.findOne({ where: { id: reviewId } });
    if (!review) throw new NotFoundException("Review not found");

    await this.reviewRepo.update(reviewId, {
      status: dto.status,
      moderationNote: dto.moderationNote,
    });

    if (
      dto.status === ReviewStatus.APPROVED ||
      dto.status === ReviewStatus.REJECTED
    ) {
      await this.recalculateVendorRating(review.vendorId);
    }

    return this.toDto({
      ...review,
      status: dto.status,
      moderationNote: dto.moderationNote,
    });
  }

  async vendorReply(
    vendorUserId: string,
    reviewId: string,
    reply: string,
  ): Promise<ReviewResponseDto> {
    const vendor = await this.vendorRepo.findOne({
      where: { userId: vendorUserId },
    });
    if (!vendor) throw new NotFoundException("Vendor profile not found");

    const review = await this.reviewRepo.findOne({ where: { id: reviewId } });
    if (!review) throw new NotFoundException("Review not found");
    if (review.vendorId !== vendor.id)
      throw new ForbiddenException("Not your review");

    await this.reviewRepo.update(reviewId, { vendorReply: reply });
    return this.toDto({ ...review, vendorReply: reply });
  }

  async findOne(reviewId: string): Promise<ReviewResponseDto> {
    const review = await this.reviewRepo.findOne({ where: { id: reviewId } });
    if (!review) throw new NotFoundException("Review not found");
    return this.toDto(review);
  }

  private async recalculateVendorRating(vendorId: string): Promise<void> {
    const result = await this.reviewRepo
      .createQueryBuilder("r")
      .select("AVG(r.overallRating)", "avg")
      .addSelect("COUNT(r.id)", "count")
      .where("r.vendorId = :vendorId", { vendorId })
      .andWhere("r.status = :status", { status: ReviewStatus.APPROVED })
      .getRawOne();

    await this.vendorRepo.update(vendorId, {
      averageRating: parseFloat(result?.avg ?? "0"),
      reviewCount: parseInt(result?.count ?? "0", 10),
    });
  }
}
