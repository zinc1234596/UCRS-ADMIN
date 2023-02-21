import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({ description: 'id', example: 1089 })
  @IsNumber({}, { message: 'id 类型错误' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;

  @ApiProperty({ description: '部门名称', example: '运营中心' })
  @IsString({ message: 'departmentName 类型错误' })
  @IsNotEmpty({ message: '部门名称不能为空' })
  departmentName: string;

  @ApiProperty({ description: '备注', example: '同行政部门' })
  description: string;
}
