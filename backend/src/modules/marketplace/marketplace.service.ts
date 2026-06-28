import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vendor } from "../vendors/entities/vendor.entity";

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Vendor) private readonly vendorRepo: Repository<Vendor>,
  ) {}

  async getHomepageData() {
    const [featured, newest, categoryStats, cityStats] = await Promise.all([
      this.getFeaturedVendors(8),
      this.vendorRepo.find({
        where: { status: "ACTIVE" },
        order: { createdAt: "DESC" },
        take: 5,
      }),
      this.getCategoryStats(),
      this.getCitiesWithMostVendors(12),
    ]);

    const totalVendors = await this.vendorRepo.count({
      where: { status: "ACTIVE" },
    });

    return { featured, newest, categoryStats, cityStats, totalVendors };
  }

  async getRankings(query: {
    category?: string;
    city?: string;
    page?: number;
    limit?: number;
  }) {
    const qb = this.vendorRepo
      .createQueryBuilder("v")
      .where("v.status = :s", { s: "ACTIVE" });
    if (query.category)
      qb.andWhere("v.categorySlug = :cat", { cat: query.category });
    if (query.city) qb.andWhere("v.citySlug = :city", { city: query.city });
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const [vendors, total] = await qb
      .orderBy("v.rankScore", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { data: vendors.map(this.toPublic), total, page, limit };
  }

  async getCategoryPage(category: string, city?: string) {
    const qb = this.vendorRepo
      .createQueryBuilder("v")
      .where("v.status = :s", { s: "ACTIVE" })
      .andWhere("v.categorySlug = :cat", { cat: category });
    if (city) qb.andWhere("v.citySlug = :city", { city });
    qb.orderBy("v.rankScore", "DESC");
    const vendors = await qb.getMany();
    return { data: vendors.map(this.toPublic), total: vendors.length };
  }

  async getFeaturedVendors(limit = 8) {
    const vendors = await this.vendorRepo
      .createQueryBuilder("v")
      .where("v.status = :s", { s: "ACTIVE" })
      .andWhere("(v.isFeatured = true OR v.plan = :plan)", { plan: "PREMIUM" })
      .orderBy("v.rankScore", "DESC")
      .take(limit)
      .getMany();
    return vendors.map(this.toPublic);
  }

  async getCitiesWithMostVendors(limit = 12) {
    const result = await this.vendorRepo
      .createQueryBuilder("v")
      .select("v.city", "city")
      .addSelect("v.citySlug", "citySlug")
      .addSelect("COUNT(v.id)", "vendorCount")
      .where("v.status = :s", { s: "ACTIVE" })
      .andWhere("v.city IS NOT NULL")
      .groupBy("v.city")
      .addGroupBy("v.citySlug")
      .orderBy("COUNT(v.id)", "DESC")
      .limit(limit)
      .getRawMany();

    return result.map((r) => ({
      name: r.city,
      slug: r.citySlug,
      vendorCount: parseInt(r.vendorCount, 10),
    }));
  }

  private async getCategoryStats() {
    const result = await this.vendorRepo
      .createQueryBuilder("v")
      .select("v.category", "category")
      .addSelect("v.categorySlug", "categorySlug")
      .addSelect("COUNT(v.id)", "vendorCount")
      .where("v.status = :s", { s: "ACTIVE" })
      .andWhere("v.category IS NOT NULL")
      .groupBy("v.category")
      .addGroupBy("v.categorySlug")
      .orderBy("COUNT(v.id)", "DESC")
      .getRawMany();

    return result.map((r) => ({
      name: r.category,
      slug: r.categorySlug,
      vendorCount: parseInt(r.vendorCount, 10),
    }));
  }

  private toPublic(v: Vendor) {
    return {
      id: v.id,
      slug: v.slug,
      businessName: v.businessName,
      tagline: v.tagline,
      category: v.category,
      categorySlug: v.categorySlug,
      city: v.city,
      citySlug: v.citySlug,
      coverImage: v.coverImage,
      plan: v.plan,
      rating: v.averageRating,
      reviewCount: v.reviewCount,
      isVerified: v.isVerified,
      isFeatured: v.isFeatured,
      rankScore: v.rankScore,
      minPrice: Number(v.minPrice) || 0,
      maxPrice: Number(v.maxPrice) || 0,
    };
  }
}
