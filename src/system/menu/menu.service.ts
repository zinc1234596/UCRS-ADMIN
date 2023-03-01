import { Injectable } from '@nestjs/common';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '@/system/menu/entities/menu.entity';
import { Repository } from 'typeorm';
import { flatten } from '@/common/utils';
import { BusinessException } from '@/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}
  // async createMenu(createMenuArrayDto: CreateMenuArrayDto) {
  // if (
  //   createMenuArrayDto[0].path &&
  //   !createMenuArrayDto[0].path.startsWith('/')
  // ) {
  //   throw new BusinessException({
  //     code: BUSINESS_ERROR_CODE.MENU_PARAM_INVALID,
  //     message: 'Path and redirect must start with "/"',
  //   });
  // }
  // if (createMenuArrayDto[0].parentId) {
  //   const parentMenu = await this.menuRepository.findOne({
  //     where: { parentId: createMenuDto.parentId },
  //   });
  //   if (!parentMenu) {
  //     throw new BusinessException({
  //       code: BUSINESS_ERROR_CODE.MENU_PARAM_INVALID,
  //       message: 'Parent menu with id ${createMenuDto.parentId} not found',
  //     });
  //   }
  // }
  // // {
  // //   "path": "/home",
  // //   "name": "主页",
  // //   "component": "home",
  // //   "redirect": null,
  // //   "meta": {
  // //   "title": "用户",
  // //     "icon": "Document"
  // // },
  // //   "level": 1,
  // //   "parentId": null
  // // }
  // console.log(createMenuDto);
  // console.log(flatten(createMenuDto));
  // const flattenData = flatten(createMenuDto);
  // console.log(flattenData);
  // // flattenData.forEach((item) => {
  // //   const newMenu = this.menuRepository.create(item);
  // //   this.menuRepository.save(newMenu);
  // // });
  // }
}
