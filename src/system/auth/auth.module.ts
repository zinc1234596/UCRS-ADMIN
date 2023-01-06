import { forwardRef, Module } from '@nestjs/common';
import { AuthStrategy } from '@/system/auth/auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/system/user/user.module';
import { AuthService } from '@/system/auth/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 注册Passport中间件
    forwardRef(() => UserModule), // 模块间循环依赖处理
  ],
  providers: [AuthService, AuthStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
