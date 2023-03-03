import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '账号', example: 'user' })
  @IsString({ message: 'username 类型错误' })
  username: string;

  @ApiProperty({ description: '角色id', example: '1' })
  @IsNumber({}, { message: 'roleId类型错误' })
  roleId: number;

  @ApiProperty({ description: '部门id', example: 1 })
  @IsNumber({}, { message: 'departmentId类型错误' })
  departmentId: number;
}
