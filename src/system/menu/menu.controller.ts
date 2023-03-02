import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RoleService } from '@/system/role/role.service';
import { Public, RoleAuth } from '@/common/decorator/public.decorator';
import { Menu } from '@/system/menu/entities/menu.entity';
import { USER_ROLE_LEVEL } from '@/common/constants/user.role.constants';
import { RoleAuthGuard } from '@/common/guards/role.auth.guard.service';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
  ) {}

  // @Post('/createMenu')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'createMenu' })
  // createMenu(@Body() createMenuArrayDto: CreateMenuArrayDto) {
  //   return this.menuService.createMenu(createMenuArrayDto);
  // }
  @Public()
  @Get('getRoleMenus')
  // @RoleAuth(USER_ROLE_LEVEL.ADMINISTRATOR)
  // @UseGuards(RoleAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取角色菜单' })
  getRoleMenus(@Query('roleId') roleId: number): Promise<Menu[]> {
    return this.roleService.getRoleMenus(roleId);
  }
}
