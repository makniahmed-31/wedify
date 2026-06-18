import { IsString, IsOptional, IsEnum, IsArray, IsNumber, Min, Max, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export enum VendorCategory {
  VENUE = 'VENUE',
  PHOTOGRAPHER = 'PHOTOGRAPHER',
  VIDEOGRAPHER = 'VIDEOGRAPHER',
  CATERER = 'CATERER',
  FLORIST = 'FLORIST',
  DJ = 'DJ',
  BAND = 'BAND',
  PLANNER = 'PLANNER',
  CAKE = 'CAKE',
  HAIR_MAKEUP = 'HAIR_MAKEUP',
  TRANSPORTATION = 'TRANSPORTATION',
  OFFICIANT = 'OFFICIANT',
}

export enum VendorStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export class CreateVendorProfileDto {
  @ApiProperty()
  @IsString()
  businessName: string;

  @ApiProperty({ enum: VendorCategory })
  @IsEnum(VendorCategory)
  category: VendorCategory;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  startingPrice?: number;
}

export class UpdateVendorProfileDto extends PartialType(CreateVendorProfileDto) {}

export class VendorResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  businessName: string;

  @ApiProperty({ enum: VendorCategory })
  category: VendorCategory;

  @ApiProperty({ enum: VendorStatus })
  status: VendorStatus;

  @ApiPropertyOptional()
  averageRating?: number;

  @ApiPropertyOptional()
  reviewCount?: number;

  @ApiPropertyOptional()
  seoScore?: number;

  @ApiProperty()
  createdAt: Date;
}
