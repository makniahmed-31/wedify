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
  category: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'BASIC' })
  plan: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  startingPrice: number;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @Column({ name: 'review_count', default: 0 })
  reviewCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
