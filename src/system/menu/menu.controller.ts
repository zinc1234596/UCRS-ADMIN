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
  @Get('getRoleMenus')
  // @RoleAuth({
  //   roleLevel: USER_ROLE_LEVEL.ASSISTANT,
  //   guards: [RoleAuthGuard],
  // })
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取角色菜单' })
  getRoleMenus(@Query('roleId') roleId: number): Promise<Menu[]> {
    return this.roleService.getRoleMenus(roleId);
  }

  @Get('getOwnMenu')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取登陆用户的菜单' })
  getOwnMenu(@Request() req) {
    return this.roleService.getRoleMenus(req.user.role.id);
  }

  @Post('saveRoleMenus')
  saveTheRoleMenus(@Body() body: any) {
    console.log(body);
    return this.roleService.saveRoleMenus(body);
  }
}
