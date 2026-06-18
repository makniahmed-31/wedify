import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { CreateVendorProfileDto, UpdateVendorProfileDto, VendorResponseDto } from './dto/vendor.dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly repo: Repository<Vendor>,
  ) {}

  async createProfile(userId: string, dto: CreateVendorProfileDto): Promise<VendorResponseDto> {
    const vendor = this.repo.create({
      businessName: dto.businessName,
      category: dto.category as string,
      description: dto.description,
      city: dto.city,
      website: dto.website,
      startingPrice: dto.startingPrice,
      status: 'PENDING',
      plan: 'BASIC',
    });
    const saved = await this.repo.save(vendor);
    return this.toDto(saved, userId);
  }

  async getMyProfile(userId: string): Promise<VendorResponseDto> {
    throw new Error('Not implemented');
  }

  async updateProfile(userId: string, dto: UpdateVendorProfileDto): Promise<VendorResponseDto> {
    throw new Error('Not implemented');
  }

  async findById(vendorId: string): Promise<VendorResponseDto> {
    const vendor = await this.repo.findOne({ where: { id: vendorId, status: 'ACTIVE' } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return this.toDto(vendor);
  }

  async findAll(filters: Record<string, any>, page: number, limit: number) {
    const qb = this.repo.createQueryBuilder('v').where('v.status = :status', { status: 'ACTIVE' });
    if (filters.category) qb.andWhere('v.category ILIKE :cat', { cat: `%${filters.category}%` });
    if (filters.city) qb.andWhere('v.city ILIKE :city', { city: `%${filters.city}%` });
    const [data, total] = await qb.skip((+page - 1) * +limit).take(+limit).getManyAndCount();
    return { data: data.map((v) => this.toDto(v)), total, page, limit };
  }

  async updateStatus(vendorId: string, status: string): Promise<VendorResponseDto> {
    const vendor = await this.repo.findOne({ where: { id: vendorId } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    await this.repo.update(vendorId, { status });
    return this.toDto({ ...vendor, status });
  }

  async uploadMedia(vendorId: string, userId: string, files: Express.Multer.File[]) {
    throw new Error('Not implemented');
  }

  async getVendorStats(vendorId: string) {
    throw new Error('Not implemented');
  }

  private toDto(vendor: Vendor, userId = ''): VendorResponseDto {
    return {
      id: vendor.id,
      userId,
      businessName: vendor.businessName,
      category: vendor.category as any,
      status: vendor.status as any,
      averageRating: vendor.averageRating,
      reviewCount: vendor.reviewCount,
      createdAt: vendor.createdAt,
    };
  }
}
