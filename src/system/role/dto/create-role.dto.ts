import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '身份名称', example: '助理' })
  @IsString({ message: 'role_name 类型错误' })
  @IsNotEmpty({ message: '身份名称不能为空' })
  role_name: string;
  @ApiProperty({ description: '等级', example: 2 })
  @IsNumber({}, { message: 'level类型错误' })
  @IsNotEmpty({ message: '等级不能为空' })
  level: number;
}
