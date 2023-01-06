import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { User } from '@/system/user/entities/user.entity';
import { BusinessException } from '@/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@/system/user/dto/create-user.dto';
import { LoginUserDto } from '@/system/user/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * login
   * @param username
   * @param password
   */
  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.findOneByUserName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.getToken({ username });
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_PASSWORD_INVALID,
        message: '账号密码错误',
      });
    }
  }

  /**
   * 注册
   */
  async register(createUserDto: CreateUserDto) {
    const user = await this.findOneByUserName(createUserDto.username);
    if (user) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_INVALID,
        message: '账号已经存在，请更换账号',
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(createUserDto.password, salt);
      const { username, role_level } = createUserDto;
      const result = await this.userRepository.save({
        username,
        password,
        role_level,
      });
      if (result) return 'register success!';
    }
  }

  /**
   * 生成 token 与 刷新 token
   * @param payload
   * @returns
   */
  getToken(payload: { username: string }) {
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  /**
   * findOneByUserName
   * @param username
   */
  async findOneByUserName(username: string) {
    return await this.userRepository.findOne({
      where: { username },
    });
  }
}
