import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from '@/system/role/dto/create-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('addRole')
  async addRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.addRole(createRoleDto);
  }

  @Get('get')
  async getRoleList(@Request() req) {
    const { roleLevel } = req.user.role;
    return this.roleService.getRoleList(roleLevel);
  }
}
