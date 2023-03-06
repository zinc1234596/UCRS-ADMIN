import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from '@/system/role/dto/create-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('addRole')
  @ApiBearerAuth()
  async addRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.addRole(createRoleDto);
  }

  @Get('get')
  @ApiBearerAuth()
  async getRoleList(@Request() req) {
    return this.roleService.getRoleList(req.user.role.roleLevel);
  }
}
