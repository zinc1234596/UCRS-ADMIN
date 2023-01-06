import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from '@/system/role/dto/create-role.dto';
import { Public } from '@/common/decorator/public.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('newRole')
  @Public()
  async newRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.newRole(createRoleDto);
  }
}
