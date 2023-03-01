import { Controller, Post, Body } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // @Post('/createMenu')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'createMenu' })
  // createMenu(@Body() createMenuArrayDto: CreateMenuArrayDto) {
  //   return this.menuService.createMenu(createMenuArrayDto);
  // }
}
