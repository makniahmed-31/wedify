import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'business_name' })
  businessName: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  tagline: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column({ name: 'category_slug', nullable: true })
  categorySlug: string;

  @Column({ nullable: true })
  city: string;

  @Column({ name: 'city_slug', nullable: true })
  citySlug: string;

  @Column({ name: 'cover_image', nullable: true })
  coverImage: string;

  @Column({ default: 'BRONZE' })
  plan: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({ name: 'rank_score', default: 0 })
  rankScore: number;

  @Column({ name: 'min_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
  minPrice: number;

  @Column({ name: 'max_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxPrice: number;

  @Column({ name: 'response_time', nullable: true })
  responseTime: string;

  @Column({ name: 'years_in_business', default: 0 })
  yearsInBusiness: number;

  @Column({ name: 'starting_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
  startingPrice: number;

  @Column({ name: 'average_rating', type: 'float', default: 0 })
  averageRating: number;

  @Column({ name: 'review_count', default: 0 })
  reviewCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
