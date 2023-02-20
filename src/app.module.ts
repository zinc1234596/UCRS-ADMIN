import { Module } from '@nestjs/common';
import { getConfig } from './common/utils';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './system/user/user.module';
import { AuthModule } from './system/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { RoleModule } from './system/role/role.module';
import { MenuModule } from './system/menu/menu.module';
import { Role } from '@/system/role/entities/role.entity';
import { User } from '@/system/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '@/system/menu/entities/menu.entity';
import { DepartmentModule } from './system/department/department.module';
import { Department } from '@/system/department/entities/department.entity';
const { MYSQL_CONFIG } = getConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    TypeOrmModule.forRoot({
      ...MYSQL_CONFIG,
      entities: [User, Role, Menu, Department],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RoleModule,
    MenuModule,
    DepartmentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
