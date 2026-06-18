import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  async findAll(page: number, limit: number): Promise<{ data: UserResponseDto[]; total: number }> {
    // TODO: Paginated query from DB
    throw new Error('Not implemented');
  }

  async findOne(id: string): Promise<UserResponseDto> {
    // TODO: Find user by ID, throw NotFoundException if not found
    throw new Error('Not implemented');
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    // TODO: Find user by email for auth
    throw new Error('Not implemented');
  }

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    // TODO: Create and persist user
    throw new Error('Not implemented');
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    // TODO: Update user fields
    throw new Error('Not implemented');
  }

  async remove(id: string): Promise<void> {
    // TODO: Soft-delete user
  }

  async getProfile(userId: string): Promise<UserResponseDto> {
    return this.findOne(userId);
  }

  async updateProfile(userId: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    return this.update(userId, dto);
  }
}
