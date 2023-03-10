import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '@/system/menu/entities/menu.entity';
import { RoleModule } from '@/system/role/role.module';
import { RoleService } from '@/system/role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), RoleModule],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
