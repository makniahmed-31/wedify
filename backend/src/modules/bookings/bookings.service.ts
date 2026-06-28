import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "./entities/booking.entity";
import { Vendor } from "../vendors/entities/vendor.entity";
import {
  CreateBookingDto,
  UpdateBookingDto,
  BookingResponseDto,
  BookingStatus,
} from "./dto/booking.dto";

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Vendor) private readonly vendorRepo: Repository<Vendor>,
  ) {}

  private toDto(b: Booking): BookingResponseDto {
    return {
      id: b.id,
      coupleId: b.coupleId,
      vendorId: b.vendorId,
      serviceId: b.serviceId,
      status: b.status,
      weddingDate: b.weddingDate,
      totalAmount: b.totalAmount ? Number(b.totalAmount) : undefined,
      depositAmount: b.depositAmount ? Number(b.depositAmount) : undefined,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    };
  }

  async create(
    coupleId: string,
    dto: CreateBookingDto,
  ): Promise<BookingResponseDto> {
    const vendor = await this.vendorRepo.findOne({
      where: { id: dto.vendorId, status: "ACTIVE" },
    });
    if (!vendor) throw new NotFoundException("Vendor not found or not active");

    const booking = this.bookingRepo.create({
      coupleId,
      vendorId: dto.vendorId,
      serviceId: dto.serviceId,
      weddingDate: new Date(dto.weddingDate),
      guestCount: dto.guestCount,
      notes: dto.notes,
      status: BookingStatus.PENDING,
    });
    const saved = await this.bookingRepo.save(booking);
    return this.toDto(saved);
  }

  async findForCouple(
    coupleId: string,
    status?: BookingStatus,
  ): Promise<BookingResponseDto[]> {
    const qb = this.bookingRepo
      .createQueryBuilder("b")
      .where("b.coupleId = :coupleId", { coupleId });
    if (status) qb.andWhere("b.status = :status", { status });
    qb.orderBy("b.createdAt", "DESC");
    const bookings = await qb.getMany();
    return bookings.map(this.toDto.bind(this));
  }

  async findForVendor(
    vendorId: string,
    status?: BookingStatus,
  ): Promise<BookingResponseDto[]> {
    const qb = this.bookingRepo
      .createQueryBuilder("b")
      .where("b.vendorId = :vendorId", { vendorId });
    if (status) qb.andWhere("b.status = :status", { status });
    qb.orderBy("b.createdAt", "DESC");
    const bookings = await qb.getMany();
    return bookings.map(this.toDto.bind(this));
  }

  async findForVendorByUserId(
    userId: string,
    status?: BookingStatus,
  ): Promise<BookingResponseDto[]> {
    const vendor = await this.vendorRepo.findOne({ where: { userId } });
    if (!vendor) return [];
    return this.findForVendor(vendor.id, status);
  }

  async findOne(bookingId: string): Promise<BookingResponseDto> {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
    });
    if (!booking) throw new NotFoundException("Booking not found");
    return this.toDto(booking);
  }

  async confirm(
    vendorUserId: string,
    bookingId: string,
  ): Promise<BookingResponseDto> {
    const vendor = await this.vendorRepo.findOne({
      where: { userId: vendorUserId },
    });
    if (!vendor) throw new NotFoundException("Vendor profile not found");

    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
    });
    if (!booking) throw new NotFoundException("Booking not found");
    if (booking.vendorId !== vendor.id)
      throw new ForbiddenException("Not your booking");
    if (booking.status !== BookingStatus.PENDING)
      throw new BadRequestException("Booking is not pending");

    await this.bookingRepo.update(bookingId, {
      status: BookingStatus.CONFIRMED,
    });
    return this.toDto({ ...booking, status: BookingStatus.CONFIRMED });
  }

  async complete(bookingId: string): Promise<BookingResponseDto> {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
    });
    if (!booking) throw new NotFoundException("Booking not found");
    if (booking.status !== BookingStatus.CONFIRMED)
      throw new BadRequestException("Booking is not confirmed");

    await this.bookingRepo.update(bookingId, {
      status: BookingStatus.COMPLETED,
    });
    return this.toDto({ ...booking, status: BookingStatus.COMPLETED });
  }

  async cancel(
    userId: string,
    bookingId: string,
    reason?: string,
  ): Promise<BookingResponseDto> {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
    });
    if (!booking) throw new NotFoundException("Booking not found");
    if (
      ![BookingStatus.PENDING, BookingStatus.CONFIRMED].includes(booking.status)
    ) {
      throw new BadRequestException(
        "Cannot cancel a booking with status " + booking.status,
      );
    }

    await this.bookingRepo.update(bookingId, {
      status: BookingStatus.CANCELLED,
      cancellationReason: reason,
    });
    return this.toDto({ ...booking, status: BookingStatus.CANCELLED });
  }

  async update(
    bookingId: string,
    dto: UpdateBookingDto,
  ): Promise<BookingResponseDto> {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
    });
    if (!booking) throw new NotFoundException("Booking not found");
    await this.bookingRepo.update(bookingId, dto as any);
    return this.toDto({ ...booking, ...dto });
  }
}
