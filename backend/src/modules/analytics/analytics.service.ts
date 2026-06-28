import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vendor } from "../vendors/entities/vendor.entity";
import { AnalyticsQueryDto } from "./dto/analytics.dto";

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Vendor) private readonly vendorRepo: Repository<Vendor>,
  ) {}

  async getVendorAnalytics(userId: string, query: AnalyticsQueryDto) {
    const vendor = await this.vendorRepo.findOne({ where: { userId } });
    if (!vendor) return null;

    return {
      vendorId: vendor.id,
      period: query.period ?? "LAST_30_DAYS",
      profileViews: 0,
      profileViewsTrend: 0,
      inquiries: 0,
      bookingRequests: 0,
      confirmedBookings: 0,
      conversionRate: 0,
      totalRevenue: 0,
      averageRating: vendor.averageRating,
      reviewCount: vendor.reviewCount,
      searchImpressions: 0,
      searchClickThroughRate: 0,
    };
  }

  async trackEvent(_event: {
    type: string;
    vendorId?: string;
    userId?: string;
    metadata?: Record<string, any>;
  }): Promise<void> {
    // Events tracking not yet implemented - requires analytics_events table
  }

  async getPlatformStats(_query: AnalyticsQueryDto) {
    const totalVendors = await this.vendorRepo.count({
      where: { status: "ACTIVE" },
    });
    const pendingVendors = await this.vendorRepo.count({
      where: { status: "PENDING" },
    });

    const cityResult = await this.vendorRepo
      .createQueryBuilder("v")
      .select("COUNT(DISTINCT v.citySlug)", "count")
      .where("v.status = :s", { s: "ACTIVE" })
      .getRawOne();

    return {
      totalVendors,
      pendingVendors,
      totalCities: parseInt(cityResult?.count ?? "0", 10),
      totalBookings: 0,
      totalUsers: 0,
    };
  }

  async getRevenueReport(vendorId: string, _query: AnalyticsQueryDto) {
    return { vendorId, revenue: [], total: 0 };
  }

  async getTopVendors(category?: string, limit = 10) {
    const qb = this.vendorRepo
      .createQueryBuilder("v")
      .where("v.status = :s", { s: "ACTIVE" })
      .orderBy("v.rankScore", "DESC")
      .take(limit);
    if (category) qb.andWhere("v.categorySlug = :cat", { cat: category });
    const vendors = await qb.getMany();
    return vendors.map((v) => ({
      id: v.id,
      businessName: v.businessName,
      slug: v.slug,
      category: v.category,
      city: v.city,
      rankScore: v.rankScore,
      averageRating: v.averageRating,
      reviewCount: v.reviewCount,
    }));
  }
}
