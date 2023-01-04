import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from '@/user/dto/login-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@/decorator/public.decorator';
import { CreateUserDto } from '@/user/dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @Public()
  @ApiOperation({ summary: '登录' })
  async login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto.username, dto.password);
  }

  @Post('/register')
  @Public()
  @ApiOperation({ summary: '注册' })
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto.username, dto.password);
  }
}
