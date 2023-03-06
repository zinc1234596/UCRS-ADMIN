import { Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Role } from '@/system/role/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from '@/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';
import { Menu } from '@/system/menu/entities/menu.entity';
import { toTree } from '@/common/utils/toTree';
import { flatten } from '@/common/utils';
import { UpdateRoleDto } from '@/system/role/dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findRoleByRoleId(roleId) {
    return await this.roleRepository.findOne({
      where: { id: roleId },
    });
  }

  async getRoleMenus(id: number): Promise<Menu[]> {
    const res = await this.roleRepository.findOne({
      where: { id },
      relations: {
        menus: true,
      },
    });
    if (res) {
      return toTree(res.menus);
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.ROLE_INVALID,
        message: '角色无效',
      });
    }
  }
  async getRoles(level: number) {
    const res = await this.roleRepository.findBy({
      roleLevel: LessThan(level),
    });
    return res;
  }

  async updateRoleMenus(id: number, updateRoleDto: UpdateRoleDto) {
    const { roleName, menusWithStatus } = updateRoleDto;
    const list = [];
    flatten(menusWithStatus).forEach((item) => {
      if (item.status) list.push(item);
    });
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: {
        menus: true,
      },
    });
    if (role) {
      role.updateDate = new Date();
      role.menus = list;
      role.roleName = roleName;
      const res = await this.roleRepository.save(role);
      if (res) return;
    }
  }
}
