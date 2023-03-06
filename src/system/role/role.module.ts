import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from '@/system/role/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from '@/system/menu/menu.service';
import { Menu } from '@/system/menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Menu])],
  controllers: [RoleController],
  providers: [RoleService, MenuService],
  exports: [RoleService],
})
export class RoleModule {}
