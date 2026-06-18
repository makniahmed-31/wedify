import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateReviewDto, ModerationDto, ReviewResponseDto, ReviewStatus } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  async create(coupleId: string, dto: CreateReviewDto): Promise<ReviewResponseDto> {
    // TODO: Verify booking is COMPLETED and belongs to couple, no duplicate review
    // TODO: Create review with status PENDING (awaiting moderation)
    throw new Error('Not implemented');
  }

  async findByVendor(vendorId: string, page: number, limit: number) {
    // TODO: Return APPROVED reviews for a vendor (public)
    throw new Error('Not implemented');
  }

  async findPending(page: number, limit: number) {
    // TODO: Admin - return reviews awaiting moderation
    throw new Error('Not implemented');
  }

  async moderate(reviewId: string, dto: ModerationDto): Promise<ReviewResponseDto> {
    // TODO: Admin - approve or reject review, update vendor average rating
    throw new Error('Not implemented');
  }

  async vendorReply(vendorId: string, reviewId: string, reply: string): Promise<ReviewResponseDto> {
    // TODO: Vendor posts a public reply to an APPROVED review
    throw new Error('Not implemented');
  }

  async findOne(reviewId: string): Promise<ReviewResponseDto> {
    throw new Error('Not implemented');
  }

  private async recalculateVendorRating(vendorId: string): Promise<void> {
    // TODO: Aggregate approved reviews to update vendor averageRating
  }
}
