import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '@/system/menu/entities/menu.entity';
import { Repository } from 'typeorm';
import { flatten } from '@/common/utils';
import { BusinessException } from '@/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';
import { toTree } from '@/common/utils/toTree';
import { Role } from '@/system/role/entities/role.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>, // private roleRepository: Repository<Role>,
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
  async getRoleMenusWithStatusForEdit(list) {
    const flattenAllMenus = await this.getFlattenAllMenus().then((res) => res);
    flattenAllMenus.forEach((item) => {
      item['status'] = false;
      flatten(list).forEach((sitem) => {
        if (item.id == sitem.id) {
          item['status'] = true;
        }
      });
    });
    const res = toTree(flattenAllMenus);
    return res;
  }

  async getFlattenAllMenus() {
    return await this.menuRepository.find({
      select: [
        'id',
        'path',
        'name',
        'redirect',
        'component',
        'meta',
        'level',
        'parentId',
      ],
    });
  }
}
