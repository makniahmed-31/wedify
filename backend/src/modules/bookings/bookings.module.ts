import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingsService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { Booking } from "./entities/booking.entity";
import { Vendor } from "../vendors/entities/vendor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Vendor])],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
