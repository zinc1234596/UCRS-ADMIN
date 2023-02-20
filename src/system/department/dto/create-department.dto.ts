import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ description: '部门名称', example: '运营中心' })
  @IsString({ message: 'departmentName 类型错误' })
  @IsNotEmpty({ message: '部门名称不能为空' })
  departmentName: string;

  @ApiProperty({ description: '备注', example: '同行政部门' })
  @IsString({ message: 'description类型错误' })
  description: string;
}
