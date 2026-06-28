import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ReviewStatus } from "../dto/review.dto";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "vendor_id" })
  vendorId: string;

  @Column({ name: "couple_id" })
  coupleId: string;

  @Column({ name: "booking_id", nullable: true })
  bookingId: string;

  @Column({ name: "overall_rating" })
  overallRating: number;

  @Column({ name: "communication_rating", nullable: true })
  communicationRating: number;

  @Column({ name: "value_rating", nullable: true })
  valueRating: number;

  @Column({ type: "text" })
  comment: string;

  @Column({ type: "enum", enum: ReviewStatus, default: ReviewStatus.PENDING })
  status: ReviewStatus;

  @Column({ name: "vendor_reply", nullable: true, type: "text" })
  vendorReply: string;

  @Column({ name: "moderation_note", nullable: true, type: "text" })
  moderationNote: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
