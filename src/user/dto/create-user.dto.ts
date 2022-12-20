import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user1' })
  username: string;
  @ApiProperty({ example: 'abc123456' })
  password: string;
}
