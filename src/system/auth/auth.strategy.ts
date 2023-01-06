import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { getConfig } from '@/common/utils';
import { AuthService } from '@/system/auth/auth.service';

// 从全局配置中获取 JWT 配置
const { JWT } = getConfig();

@Injectable()
// 继承 PassportStrategy 类并指定 JWT 策略
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从 "Authorization: Bearer" 头中提取 JWT
      secretOrKey: JWT.secretKey, // 使用 JWT 密钥对 JWT 进行签名和验证
    });
  }

  /**
   * 验证 JWT 有效载荷并返回用户名
   * 在经过成功解密令牌后，此方法 validate 将被调用。它的主要作用是在解密后的 payload 中执行具体的授权逻辑。
   * 在这里，我们使用用户名来查找是否存在指定用户。
   * 如果用户不存在，则抛出 UnauthorizedException 未授权异常，表示令牌无效。
   * 否则，将用户对象添加到请求对象中，并在之后的请求中可以使用 req.user 来获取当前登录用户。
   * @param payload
   */
  async validate(payload: { username: string }) {
    const user = await this.authService.validateUser(payload);
    console.log(user);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
