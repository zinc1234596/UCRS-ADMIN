import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Get,
  Query,
  UseGuards,
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
import { RoleAuthGuard } from '@/common/guards/role.auth.guard.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @Public()
  @ApiOperation({ summary: '登录' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('/create')
  @RoleAuth(USER_ROLE_LEVEL.MANAGER)
  @UseGuards(RoleAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '增加用户/注册' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Delete('/delete/:id')
  @RoleAuth(USER_ROLE_LEVEL.MANAGER)
  @UseGuards(RoleAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除用户' })
  async delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Put('/update/:id')
  @RoleAuth(USER_ROLE_LEVEL.MANAGER)
  @UseGuards(RoleAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新用户信息' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get('/fetch')
  @RoleAuth(USER_ROLE_LEVEL.ASSISTANT)
  @UseGuards(RoleAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '分页查询用户' })
  async fetchUsers(@Query() fetchUserDto: FetchUserDto) {
    console.log(fetchUserDto);
    return this.userService.fetchUsers(fetchUserDto);
  }

  @Post('/resetPassword')
  @RoleAuth(USER_ROLE_LEVEL.MANAGER)
  @UseGuards(RoleAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '重置密码' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(resetPasswordDto);
  }
}
