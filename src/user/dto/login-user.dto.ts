import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: '账号' })
  @IsString({ message: 'username 类型错误' })
  @IsNotEmpty({ message: '账号不能为空' })
  username: string;

  @ApiProperty({ description: '密码' })
  @IsString({ message: 'password 类型错误' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
