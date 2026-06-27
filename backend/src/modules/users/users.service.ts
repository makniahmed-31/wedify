import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findAll(page: number, limit: number): Promise<{ data: UserResponseDto[]; total: number }> {
    const [data, total] = await this.userRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data: data.map(this.toDto), total };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { googleId } });
  }

  async create(data: DeepPartial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async update(id: string, data: DeepPartial<User>): Promise<User> {
    await this.userRepo.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }

  async getProfile(userId: string): Promise<UserResponseDto> {
    const user = await this.findOne(userId);
    return this.toDto(user);
  }

  async updateProfile(userId: string, data: DeepPartial<User>): Promise<UserResponseDto> {
    const user = await this.update(userId, data);
    return this.toDto(user);
  }

  private toDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
