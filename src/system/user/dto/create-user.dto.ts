import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '账号', example: 'user' })
  @IsString({ message: 'username 类型错误' })
  @IsNotEmpty({ message: '账号不能为空' })
  username: string;

  @ApiProperty({ description: '密码', example: '10086' })
  @IsString({ message: 'password 类型错误' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ description: '身份等级', example: '1' })
  @IsNumber({}, { message: 'role_level类型错误' })
  @IsNotEmpty({ message: '身份等级不能为空' })
  roleLevel: number;
}
