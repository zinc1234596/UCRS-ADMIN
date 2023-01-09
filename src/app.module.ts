import { Module } from '@nestjs/common';
import { getConfig } from './common/utils';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './system/user/user.module';
import { AuthModule } from './system/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { RoleModule } from './system/role/role.module';
import { MenuModule } from './system/menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
    AuthModule,
    RoleModule,
    MenuModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
