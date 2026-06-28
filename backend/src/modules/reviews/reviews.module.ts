import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { Review } from "./entities/review.entity";
import { Vendor } from "../vendors/entities/vendor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Review, Vendor])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
