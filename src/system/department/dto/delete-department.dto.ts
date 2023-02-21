import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteDepartmentDto {
  @ApiProperty({ description: 'id', example: 1089 })
  @IsNumber({}, { message: 'id 类型错误' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;
}
