import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../vendors/entities/vendor.entity';
import { AdminVendorActionDto, AdminStatsDto, AdminQueryDto } from './dto/admin.dto';

const PLAN_REVENUE: Record<string, number> = { BASIC: 29, PRO: 79, PREMIUM: 149 };

const SEED_VENDORS = [
  { businessName: "Elegance Hall Tunis", category: "Salles de mariage", city: "Tunis", plan: "PREMIUM", status: "ACTIVE" },
  { businessName: "Photo Elite Studio", category: "Photographes", city: "Tunis", plan: "PRO", status: "PENDING" },
  { businessName: "Cake Paradise", category: "Gâteaux", city: "Sfax", plan: "PRO", status: "ACTIVE" },
  { businessName: "DJ Maestro", category: "DJs", city: "Nabeul", plan: "BASIC", status: "ACTIVE" },
  { businessName: "Décor Rêve", category: "Décorateurs", city: "Sousse", plan: "PRO", status: "PENDING" },
  { businessName: "Le Jardin Royal", category: "Lieux de réception", city: "Sousse", plan: "PREMIUM", status: "ACTIVE" },
  { businessName: "Henna & Art", category: "Artistes henné", city: "Monastir", plan: "BASIC", status: "SUSPENDED" },
  { businessName: "Orchestre Carthage", category: "Groupes musicaux", city: "Bizerte", plan: "PRO", status: "ACTIVE" },
  { businessName: "Château des Roses", category: "Salles de mariage", city: "Hammamet", plan: "PREMIUM", status: "ACTIVE" },
  { businessName: "Vision Photography", category: "Photographes", city: "Sousse", plan: "PRO", status: "ACTIVE" },
  { businessName: "Sweet Dreams Pâtisserie", category: "Gâteaux", city: "Tunis", plan: "PREMIUM", status: "PENDING" },
  { businessName: "Flowers & Co", category: "Fleuristes", city: "Sfax", plan: "BASIC", status: "ACTIVE" },
  { businessName: "Limousine Star", category: "Transport", city: "Tunis", plan: "PRO", status: "ACTIVE" },
  { businessName: "Studio Glamour", category: "Photographes", city: "Monastir", plan: "BASIC", status: "PENDING" },
  { businessName: "Pâtisserie Orient", category: "Gâteaux", city: "Kairouan", plan: "BASIC", status: "ACTIVE" },
  { businessName: "DJ Fusion", category: "DJs", city: "Tunis", plan: "PRO", status: "ACTIVE" },
  { businessName: "Beauté Orientale", category: "Coiffure & Maquillage", city: "Sousse", plan: "PRO", status: "ACTIVE" },
  { businessName: "Villa Jasmin", category: "Lieux de réception", city: "La Marsa", plan: "PREMIUM", status: "ACTIVE" },
  { businessName: "Atelier Henné Fatma", category: "Artistes henné", city: "Sfax", plan: "BASIC", status: "SUSPENDED" },
  { businessName: "Band El Andalus", category: "Groupes musicaux", city: "Tunis", plan: "PREMIUM", status: "ACTIVE" },
];

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepo: Repository<Vendor>,
  ) {}

  async getDashboardStats(): Promise<AdminStatsDto> {
    const totalVendors = await this.vendorRepo.count();
    const activeVendors = await this.vendorRepo.count({ where: { status: 'ACTIVE' } });
    const pendingVendors = await this.vendorRepo.count({ where: { status: 'PENDING' } });
    const all = await this.vendorRepo.find({ select: ['plan', 'status'] });
    const mrr = all
      .filter((v) => v.status === 'ACTIVE')
      .reduce((sum, v) => sum + (PLAN_REVENUE[v.plan] ?? 0), 0);

    return {
      totalUsers: 0,
      totalVendors,
      activeVendors,
      pendingVendors,
      totalBookings: 0,
      totalRevenue: mrr * 12,
      monthlyRecurringRevenue: mrr,
      averageSeoScore: 0,
      pendingReviews: 0,
    };
  }

  async listVendors(query: AdminQueryDto) {
    const qb = this.vendorRepo.createQueryBuilder('v');

    if (query.status) qb.andWhere('v.status = :status', { status: query.status });
    if (query.plan) qb.andWhere('v.plan = :plan', { plan: query.plan });
    if (query.search) {
      qb.andWhere('(v.businessName ILIKE :s OR v.city ILIKE :s)', { s: `%${query.search}%` });
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 100;

    const [vendors, total] = await qb
      .orderBy('v.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: vendors.map((v) => ({
        id: v.id,
        name: v.businessName,
        category: v.category,
        city: v.city,
        plan: v.plan,
        status: v.status,
        joined: v.createdAt,
        revenue: PLAN_REVENUE[v.plan] ?? 0,
      })),
      total,
      page,
      limit,
    };
  }

  async actionOnVendor(vendorId: string, dto: AdminVendorActionDto): Promise<void> {
    await this.vendorRepo.update(vendorId, { status: dto.status });
  }

  async seed(): Promise<{ inserted: number }> {
    const count = await this.vendorRepo.count();
    if (count > 0) return { inserted: 0 };
    const entities = SEED_VENDORS.map((v) => this.vendorRepo.create(v));
    await this.vendorRepo.save(entities);
    return { inserted: entities.length };
  }

  async listUsers(query: AdminQueryDto) {
    throw new Error('Not implemented');
  }

  async banUser(userId: string, reason: string): Promise<void> {}

  async listBookings(query: AdminQueryDto) {
    throw new Error('Not implemented');
  }

  async processRefund(bookingId: string, amount?: number): Promise<void> {}

  async getAuditLog(query: AdminQueryDto) {
    throw new Error('Not implemented');
  }
}
