import { Injectable } from '@nestjs/common';
import { UserService } from '@/system/user/user.service';
import { User } from '@/system/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  /**
   * @param username
   */
  async validateUser(payload: { username: string }): Promise<User> {
    return await this.userService.findOneByUserName(payload.username);
  }
}
