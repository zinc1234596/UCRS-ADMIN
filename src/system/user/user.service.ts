import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
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
import { ResetPasswordDto } from '@/system/user/dto/reset-password.dto';
import { UpdateUserDto } from '@/system/user/dto/update-user.dto';
import { FetchUserDto } from '@/system/user/dto/fetch-user.dto';

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
      if (result) return;
    }
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_INVALID,
        message: '用户无效或不存在',
      });
    }
    await this.userRepository.remove(user);
    return 'delete user success';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, roleId, departmentId } = updateUserDto;
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'department'],
    });
    if (!user) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_INVALID,
        message: '用户不存在',
      });
    }
    if (username) {
      user.username = username;
    }
    if (roleId) {
      const role = await this.roleService.findRoleByRoleId(roleId);
      if (!role) {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.ROLE_INVALID,
          message: '角色不存在',
        });
      }
      user.role = role;
    }
    if (departmentId) {
      const department = await this.departmentService.findDepartmentById(
        departmentId,
      );
      if (!department) {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.DEPARTMENT_NO_EXIST,
          message: '部门不存在',
        });
      }
      user.department = department;
    }
    await this.userRepository.save(user);
    return 'update user success';
  }

  async fetchUsers(
    fetchUserDto: FetchUserDto,
  ): Promise<{ data: User[]; total: number }> {
    const { page, limit, searchType, searchValue } = fetchUserDto;
    let where = {};
    if (searchType && searchValue) {
      if (searchType === 'id') {
        where = { [searchType]: searchValue };
      } else {
        where = { [searchType]: Like(`%${searchValue}%`) };
      }
    }
    const [data, total] = await this.userRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { id } = resetPasswordDto;
    const existUser = await this.findOneByUserId(id);
    if (existUser) {
      const defaultPassword = '123456';
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(defaultPassword, salt);
      const result = await this.userRepository.update({ id }, { password });
      if (result) return 'reset password success!';
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_INVALID,
        message: '用户无效或不存在',
      });
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
      relations: {
        role: true,
        department: true,
      },
    });
  }

  async findOneByUserId(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
