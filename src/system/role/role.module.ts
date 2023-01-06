import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleProviders } from '@/system/role/role.providers';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [...RoleProviders, RoleService],
})
export class RoleModule {}
