import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from '@/user/dto/login-user.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Public } from '@/decorator/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto.username, dto.password);
  }

  @Get('/aaa')
  @ApiBearerAuth()
  async aaa(@Req() req) {
    // console.log(req.user);
    return 1;
  }
}
