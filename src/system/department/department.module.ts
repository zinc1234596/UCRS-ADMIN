import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '@/system/department/entities/department.entity';
import { RoleService } from '@/system/role/role.service';
import { Role } from '@/system/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Role])],
  controllers: [DepartmentController],
  providers: [DepartmentService, RoleService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
