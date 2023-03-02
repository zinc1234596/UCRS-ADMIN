import { ApiProperty } from '@nestjs/swagger';

export class FetchDepartmentDto {
  @ApiProperty({ description: '页码', default: 1 })
  page: number;

  @ApiProperty({ description: '每页数量', default: 10 })
  limit: number;
}
