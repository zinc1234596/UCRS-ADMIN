import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@/system/user/entities/user.entity';
import { BusinessException } from '@/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@/system/user/dto/create-user.dto';
import { LoginUserDto } from '@/system/user/dto/login-user.dto';
import { RoleService } from '@/system/role/role.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentService } from '@/system/department/department.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly departmentService: DepartmentService,
  ) {
    this.roleService = roleService;
  }

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
      const { username, roleId, departmentId } = createUserDto;
      const role = await this.roleService.findRoleByRoleId(roleId);
      const department = await this.departmentService.findDepartmentById(
        departmentId,
      );
      const result = await this.userRepository.save({
        username,
        password,
        role,
        department,
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
