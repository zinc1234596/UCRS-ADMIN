import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMyPasswordDto {
  @ApiProperty({ description: '旧密码', example: '' })
  @IsString({ message: 'oldPassword 类型错误' })
  @IsNotEmpty({ message: '旧密码不能为空' })
  oldPassword: string;

  @ApiProperty({ description: '新密码', example: '' })
  @IsString({ message: 'newPassword 类型错误' })
  @IsNotEmpty({ message: '新密码不能为空' })
  newPassword: string;
}
