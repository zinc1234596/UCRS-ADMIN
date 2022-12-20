import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { BusinessException } from '@/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.findOneByUserName(username);
    if (user && user.password === password) {
      return this.genToken({ username });
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_PASSWORD_INVALID,
        message: '账号密码错误',
      });
    }
  }
  /**
   * 生成 token 与 刷新 token
   * @param payload
   * @returns
   */
  genToken(payload: { username: string }) {
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
    const refreshToken = this.jwtService.sign(payload);
    return { accessToken, refreshToken };
  }

  async findOneByUserName(username: string) {
    return await this.userRepository.findOne({
      where: { username },
    });
  }
}
