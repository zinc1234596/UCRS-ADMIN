import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@/common/database/database.module';
import { UserProviders } from '@/system/user/user.providers';
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from '@/common/utils';
const { JWT } = getConfig();

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: JWT.secretKey,
      signOptions: {
        expiresIn: JWT.expiresTime,
      },
    }),
  ],
  controllers: [UserController],
  providers: [...UserProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
