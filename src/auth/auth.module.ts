import { forwardRef, Module } from '@nestjs/common';
import { AuthStrategy } from '@/auth/auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
