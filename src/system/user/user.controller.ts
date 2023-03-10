import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Get,
  Query,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from '@/system/user/dto/login-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public, RoleAuth } from '@/common/decorator/public.decorator';
import { CreateUserDto } from '@/system/user/dto/create-user.dto';
import { ResetPasswordDto } from '@/system/user/dto/reset-password.dto';
import { UpdateUserDto } from '@/system/user/dto/update-user.dto';
import { FetchUserDto } from '@/system/user/dto/fetch-user.dto';
import { USER_ROLE_LEVEL } from '@/common/constants/user.role.constants';
import { UpdateMyPasswordDto } from '@/system/user/dto/update-my-password.dto';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: '登陆' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('create')
  @RoleAuth(USER_ROLE_LEVEL.MANAGER)
  @ApiOperation({ summary: '新增用户-总监及以上权限' })
  async create(@Request() req, @Body() createUserDto: CreateUserDto) {
    const userDepartmentId = req.user.department.id;
    return this.userService.createUser(userDepartmentId, createUserDto);
  }

  @Delete('delete/:id')
  @RoleAuth(USER_ROLE_LEVEL.MANAGER)
  @ApiOperation({ summary: '删除用户-总监及以上权限' })
  async delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Put('update/:id')
  @RoleAuth(USER_ROLE_LEVEL.MANAGER)
  @ApiOperation({ summary: '更新用户-总监及以上权限' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get('fetch')
  @ApiOperation({
    summary: '获取用户列表-带分页/搜索',
  })
  async fetch(@Request() req, @Query() fetchUserDto: FetchUserDto) {
    const userDepartmentId = req.user.department.id;
    return this.userService.fetchUsers(userDepartmentId, fetchUserDto);
  }

  @Post('resetPassword')
  @RoleAuth(USER_ROLE_LEVEL.MANAGER)
  @ApiOperation({ summary: '重置用户密码-总监及以上权限' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(resetPasswordDto);
  }

  @Post('updateMyPassword')
  @ApiOperation({
    summary: '更新用户(个人)密码',
  })
  async updateMyPassword(
    @Request() req,
    @Body() updateMyPasswordDto: UpdateMyPasswordDto,
  ) {
    const { id, password } = req.user;
    return this.userService.updateMyPassword(id, password, updateMyPasswordDto);
  }
}
