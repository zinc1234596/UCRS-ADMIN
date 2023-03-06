import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from '@/system/role/role.service';
import { Public, RoleAuth } from '@/common/decorator/public.decorator';
import { Menu } from '@/system/menu/entities/menu.entity';
import { USER_ROLE_LEVEL } from '@/common/constants/user.role.constants';
import { RoleAuthGuard } from '@/common/guards/role.auth.guard.service';

@ApiTags('menu')
@Controller('menu')
@ApiBearerAuth()
export class MenuController {
  constructor(private readonly roleService: RoleService) {}

  @Get('getRoleMenus')
  @ApiOperation({ summary: '获取角色菜单' })
  getRoleMenus(@Query('roleId') roleId: number): Promise<Menu[]> {
    return this.roleService.getRoleMenus(roleId);
  }

  @Get('getMyMenus')
  @ApiOperation({ summary: '获取登陆用户的菜单' })
  getMyMenu(@Request() req) {
    return this.roleService.getRoleMenus(req.user.role.id);
  }
}
