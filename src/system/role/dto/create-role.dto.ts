import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '身份名称', example: '助理' })
  @IsString({ message: 'role_name 类型错误' })
  @IsNotEmpty({ message: '身份名称不能为空' })
  roleName: string;

  @ApiProperty({ description: '身份等级', example: 2 })
  @IsNumber({}, { message: 'role_level类型错误' })
  @IsNotEmpty({ message: '身份等级不能为空' })
  roleLevel: number;
}
