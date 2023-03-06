import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '@/system/menu/entities/menu.entity';
import { Repository } from 'typeorm';
import { flatten } from '@/common/utils';
import { toTree } from '@/common/utils/toTree';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}
  async getRoleMenusWithStatus(list) {
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
