import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vendor } from "./entities/vendor.entity";
import {
  CreateVendorProfileDto,
  UpdateVendorProfileDto,
  VendorResponseDto,
} from "./dto/vendor.dto";

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly repo: Repository<Vendor>,
  ) {}

  async createProfile(
    userId: string,
    dto: CreateVendorProfileDto,
  ): Promise<VendorResponseDto> {
    const vendor = this.repo.create({
      userId,
      businessName: dto.businessName,
      category: dto.category as string,
      description: dto.description,
      city: dto.city,
      website: dto.website,
      startingPrice: dto.startingPrice,
      status: "PENDING",
      plan: "BASIC",
    });
    const saved = await this.repo.save(vendor);
    return this.toDto(saved, userId);
  }

  async getMyProfile(userId: string) {
    const vendor = await this.repo.findOne({ where: { userId } });
    if (!vendor) throw new NotFoundException("Vendor profile not found");
    return this.toPublic(vendor);
  }

  async updateProfile(userId: string, dto: UpdateVendorProfileDto) {
    const vendor = await this.repo.findOne({ where: { userId } });
    if (!vendor) throw new NotFoundException("Vendor profile not found");
    const fields: Partial<typeof vendor> = {};
    if (dto.businessName !== undefined) fields.businessName = dto.businessName;
    if (dto.tagline !== undefined) fields.tagline = dto.tagline;
    if (dto.description !== undefined) fields.description = dto.description;
    if (dto.category !== undefined) fields.category = dto.category;
    if (dto.city !== undefined) fields.city = dto.city;
    if (dto.website !== undefined) fields.website = dto.website;
    if (dto.phone !== undefined) fields.phone = dto.phone;
    if (dto.whatsapp !== undefined) fields.whatsapp = dto.whatsapp;
    if (dto.email !== undefined) fields.email = dto.email;
    if (dto.facebook !== undefined) fields.facebook = dto.facebook;
    if (dto.instagram !== undefined) fields.instagram = dto.instagram;
    if (dto.youtube !== undefined) fields.youtube = dto.youtube;
    if (dto.tiktok !== undefined) fields.tiktok = dto.tiktok;
    if (dto.videoUrl !== undefined) fields.videoUrl = dto.videoUrl;
    if (dto.gallery !== undefined) fields.gallery = dto.gallery;
    if (dto.minPrice !== undefined) fields.minPrice = dto.minPrice;
    if (dto.maxPrice !== undefined) fields.maxPrice = dto.maxPrice;
    if (dto.yearsInBusiness !== undefined)
      fields.yearsInBusiness = dto.yearsInBusiness;
    await this.repo.update(vendor.id, fields);
    return this.toPublic({ ...vendor, ...fields });
  }

  async findById(vendorId: string): Promise<VendorResponseDto> {
    const vendor = await this.repo.findOne({
      where: { id: vendorId, status: "ACTIVE" },
    });
    if (!vendor) throw new NotFoundException("Vendor not found");
    return this.toDto(vendor);
  }

  async findAll(
    filters: Record<string, string | number | undefined>,
    page: number,
    limit: number,
  ) {
    const qb = this.repo
      .createQueryBuilder("v")
      .where("v.status = :status", { status: "ACTIVE" });
    if (filters.category)
      qb.andWhere("v.categorySlug = :cat", { cat: filters.category });
    if (filters.city) qb.andWhere("v.citySlug = :city", { city: filters.city });
    if (filters.minPrice)
      qb.andWhere("v.minPrice >= :min", { min: filters.minPrice });
    if (filters.maxPrice)
      qb.andWhere("v.maxPrice <= :max", { max: filters.maxPrice });
    qb.orderBy("v.rankScore", "DESC");
    const [data, total] = await qb
      .skip((+page - 1) * +limit)
      .take(+limit)
      .getManyAndCount();
    return {
      data: data.map((v) => this.toPublic(v)),
      total,
      page,
      limit,
    };
  }

  async updateStatus(
    vendorId: string,
    status: string,
  ): Promise<VendorResponseDto> {
    const vendor = await this.repo.findOne({ where: { id: vendorId } });
    if (!vendor) throw new NotFoundException("Vendor not found");
    await this.repo.update(vendorId, { status });
    return this.toDto({ ...vendor, status });
  }

  async uploadMedia(_vendorId: string, _userId: string, _files: unknown[]) {
    throw new Error("Not implemented");
  }

  async getVendorStats(_vendorId: string) {
    throw new Error("Not implemented");
  }

  async findBySlug(slug: string) {
    const vendor = await this.repo.findOne({ where: { slug } });
    if (!vendor) throw new NotFoundException("Vendor not found");
    return this.toPublic(vendor);
  }

  toPublic(v: Vendor) {
    return {
      id: v.id,
      slug: v.slug,
      businessName: v.businessName,
      tagline: v.tagline,
      description: v.description,
      category: {
        id: v.categorySlug ?? "other",
        slug: v.categorySlug ?? "other",
        name: v.category ?? "Autre",
        icon: "🏪",
        vendorCount: 0,
      },
      city: {
        id: v.citySlug ?? "other",
        slug: v.citySlug ?? "other",
        name: v.city ?? "Tunisie",
        vendorCount: 0,
      },
      coverImage: v.coverImage,
      plan: v.plan,
      status: v.status,
      rating: v.averageRating,
      reviewCount: v.reviewCount,
      isVerified: v.isVerified,
      isFeatured: v.isFeatured,
      rankScore: v.rankScore,
      minPrice: Number(v.minPrice) || 0,
      maxPrice: Number(v.maxPrice) || 0,
      responseTime: v.responseTime,
      phone: v.phone,
      whatsapp: v.whatsapp,
      email: v.email,
      website: v.website,
      facebook: v.facebook,
      instagram: v.instagram,
      youtube: v.youtube,
      tiktok: v.tiktok,
      videoUrl: v.videoUrl,
      gallery: v.gallery ?? [],
      yearsInBusiness: v.yearsInBusiness,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    };
  }

  private toDto(vendor: Vendor, userId = ""): VendorResponseDto {
    return {
      id: vendor.id,
      userId,
      businessName: vendor.businessName,
      category: vendor.category as string,
      status: vendor.status as string,
      averageRating: vendor.averageRating,
      reviewCount: vendor.reviewCount,
      createdAt: vendor.createdAt,
    };
  }
}
