import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from '@/system/role/dto/create-role.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuService } from '@/system/menu/menu.service';
import { RoleAuth } from '@/common/decorator/public.decorator';
import { USER_ROLE_LEVEL } from '@/common/constants/user.role.constants';
import { UpdateRoleDto } from '@/system/role/dto/update-role.dto';

@ApiTags('role')
@Controller('role')
@ApiBearerAuth()
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
  ) {}

  @Get('get')
  @ApiOperation({ summary: '获取角色列表' })
  async get(@Request() req) {
    const { roleLevel } = req.user.role;
    return this.roleService.getRoles(roleLevel);
  }

  @Get('fetchRoleMenus')
  @ApiOperation({ summary: '获取角色菜单' })
  async fetch(@Query('roleId') roleId: number) {
    const list = await this.roleService.getRoleMenus(roleId);
    const res = this.menuService.getRoleMenusWithStatus(list);
    return res;
  }

  @Put('updateRoleMenus/:id')
  @RoleAuth(USER_ROLE_LEVEL.ADMINISTRATOR)
  @ApiOperation({ summary: '更新角色菜单-管理员及以上权限' })
  updateRoleMenus(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.updateRoleMenus(id, updateRoleDto);
  }
}
