import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSecretGuard } from '../../common/guards/admin-secret.guard';
import { Vendor } from '../vendors/entities/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  controllers: [AdminController],
  providers: [AdminService, AdminSecretGuard],
  exports: [AdminService],
})
export class AdminModule {}
