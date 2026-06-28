import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { BookingStatus } from "../dto/booking.dto";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "couple_id" })
  coupleId: string;

  @Column({ name: "vendor_id" })
  vendorId: string;

  @Column({ name: "service_id", nullable: true })
  serviceId: string;

  @Column({ type: "enum", enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Column({ name: "wedding_date", type: "date" })
  weddingDate: Date;

  @Column({ name: "guest_count", nullable: true })
  guestCount: number;

  @Column({ nullable: true, type: "text" })
  notes: string;

  @Column({
    name: "total_amount",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalAmount: number;

  @Column({
    name: "deposit_amount",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  depositAmount: number;

  @Column({ name: "cancellation_reason", nullable: true, type: "text" })
  cancellationReason: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
