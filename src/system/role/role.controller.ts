import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from '@/system/role/dto/create-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MenuService } from '@/system/menu/menu.service';

@ApiTags('role')
@Controller('role')
@ApiBearerAuth()
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
  ) {}

  // @Put('update')
  // async update()

  @Get('get')
  async get(@Request() req) {
    const { roleLevel } = req.user.role;
    return this.roleService.getRoles(roleLevel);
  }

  @Get('fetch')
  async fetch(@Query('roleId') roleId: number) {
    const list = await this.roleService.getRoleMenus(roleId);
    const res = this.menuService.getRoleMenusWithStatus(list);
    return res;
  }
}
