import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  /**
   * @param username
   */
  async validateUser(username): Promise<User> {
    console.log(username);
    return await this.userService.findOneByUserName(username);
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneByUserName(username);
    // 注：实际中的密码处理应通过加密措施
    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  }
}
