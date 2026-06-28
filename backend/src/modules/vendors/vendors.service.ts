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
    if (filters.category) qb.andWhere('v.categorySlug = :cat', { cat: filters.category });
    if (filters.city) qb.andWhere('v.citySlug = :city', { city: filters.city });
    if (filters.minPrice) qb.andWhere('v.minPrice >= :min', { min: filters.minPrice });
    if (filters.maxPrice) qb.andWhere('v.maxPrice <= :max', { max: filters.maxPrice });
    qb.orderBy('v.rankScore', 'DESC');
    const [data, total] = await qb.skip((+page - 1) * +limit).take(+limit).getManyAndCount();
    return {
      data: data.map((v) => this.toPublic(v)),
      total,
      page,
      limit,
    };
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

  async findBySlug(slug: string) {
    const vendor = await this.repo.findOne({ where: { slug } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return this.toPublic(vendor);
  }

  toPublic(v: Vendor) {
    return {
      id: v.id,
      slug: v.slug,
      businessName: v.businessName,
      tagline: v.tagline,
      description: v.description,
      category: v.category,
      categorySlug: v.categorySlug,
      city: v.city,
      citySlug: v.citySlug,
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
      yearsInBusiness: v.yearsInBusiness,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    };
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
