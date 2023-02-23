import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from '@/common/utils';
import { User } from '@/system/user/entities/user.entity';
const { JWT } = getConfig();
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '@/system/role/role.module';
import { DepartmentModule } from '@/system/department/department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT.secretKey,
      signOptions: {
        expiresIn: JWT.expiresTime,
      },
    }),
    RoleModule,
    DepartmentModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
