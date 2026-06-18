import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateServiceDto, UpdateServiceDto, ServiceResponseDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
  async create(vendorId: string, dto: CreateServiceDto): Promise<ServiceResponseDto> {
    // TODO: Verify vendor ownership, create service
    throw new Error('Not implemented');
  }

  async findByVendor(vendorId: string): Promise<ServiceResponseDto[]> {
    // TODO: List all services for a vendor
    throw new Error('Not implemented');
  }

  async findOne(serviceId: string): Promise<ServiceResponseDto> {
    // TODO: Find service by ID
    throw new Error('Not implemented');
  }

  async update(vendorId: string, serviceId: string, dto: UpdateServiceDto): Promise<ServiceResponseDto> {
    // TODO: Verify ownership, update service
    throw new Error('Not implemented');
  }

  async remove(vendorId: string, serviceId: string): Promise<void> {
    // TODO: Verify ownership, soft-delete service
  }

  async toggleActive(vendorId: string, serviceId: string): Promise<ServiceResponseDto> {
    // TODO: Toggle isActive flag
    throw new Error('Not implemented');
  }
}
