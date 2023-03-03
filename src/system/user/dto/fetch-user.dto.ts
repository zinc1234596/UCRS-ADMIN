import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FetchUserDto {
  @ApiProperty({ description: '页码', default: 1 })
  page: number;

  @ApiProperty({ description: '每页数量', default: 10 })
  limit: number;

  @ApiPropertyOptional({ description: '搜索条件', example: 'id' })
  @IsString()
  @IsOptional()
  searchType?: string;

  @ApiPropertyOptional({ description: '搜索内容', example: '3' })
  @IsString()
  @IsOptional()
  searchValue?: string;
}
