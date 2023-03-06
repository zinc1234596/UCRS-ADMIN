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
import { FORBIDDEN_ROLE_LEVEL } from '@/common/constants/user.role.constants';
import { DEFAULT_PASSWORD } from '@/common/constants';

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

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
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

  async register(createUserDto: CreateUserDto): Promise<void> {
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
      if (role.roleLevel >= FORBIDDEN_ROLE_LEVEL) {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
          message: '禁止访问',
        });
      }
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

  async deleteUser(id: number): Promise<void> {
    const user = await this.findOneByUserId(id);
    if (!user) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_INVALID,
        message: '用户无效或不存在',
      });
    }
    if (user.role.roleLevel >= FORBIDDEN_ROLE_LEVEL) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
        message: '禁止访问',
      });
    }
    await this.userRepository.remove(user);
    return;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const { username, roleId, departmentId } = updateUserDto;
    const user = await this.findOneByUserId(id);
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
    return;
  }

  async fetchUsers(
    fetchUserDto: FetchUserDto,
  ): Promise<{ usersList: User[]; total: number }> {
    const { page, limit, searchType, searchValue } = fetchUserDto;
    let where = {};
    if (searchType && searchValue) {
      if (searchType === 'id') {
        where = { [searchType]: searchValue };
      } else {
        where = { [searchType]: Like(`%${searchValue}%`) };
      }
    }
    const [usersList, total] = await this.userRepository.findAndCount({
      where,
      select: [
        'id',
        'username',
        'role',
        'department',
        'createDate',
        'updateDate',
      ],
      relations: ['role', 'department'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return { usersList, total };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { id } = resetPasswordDto;
    const existUser = await this.findOneByUserId(id);
    if (existUser) {
      if (existUser.role.roleLevel >= FORBIDDEN_ROLE_LEVEL) {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
          message: '禁止访问',
        });
      }
      const defaultPassword = DEFAULT_PASSWORD;
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(defaultPassword, salt);
      const result = await this.userRepository.update({ id }, { password });
      if (result) return;
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_INVALID,
        message: '用户无效或不存在',
      });
    }
  }

  getToken(payload: { username: string }): { accessToken: string } {
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

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
      relations: ['role', 'department'],
    });
  }
}
