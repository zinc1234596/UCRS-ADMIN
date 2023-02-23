import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNumber({}, { message: 'id 类型错误' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;
}
