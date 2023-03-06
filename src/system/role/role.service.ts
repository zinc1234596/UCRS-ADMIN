import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '@/system/role/dto/create-role.dto';
import { LessThan, MongoRepository, MoreThan, Repository } from 'typeorm';
import { Role } from '@/system/role/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from '@/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';
import { Menu } from '@/system/menu/entities/menu.entity';
import { toTree } from '@/common/utils/toTree';
import { flatten } from '@/common/utils';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async addRole(createRoleDto: CreateRoleDto) {
    const { roleName, roleLevel } = createRoleDto;
    const existRoleName = await this.roleRepository.findOne({
      where: { roleName },
    });
    const result = await this.roleRepository.save(createRoleDto);
    if (result) {
      return 'new role success!';
    }
  }
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
  async getRoleList(level: number) {
    const res = await this.roleRepository.findBy({
      roleLevel: LessThan(level),
    });
    return res;
  }

  async saveRoleMenus(data) {
    const name = data.role_name;
    const id = data.role_id;
    const list = [];
    // if (id === 2) throw new HttpException('Forbidden！', HttpStatus.FORBIDDEN);
    flatten(data.list).forEach((item) => {
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
      role.roleName = name;
      const res = await this.roleRepository.save(role);
      if (res) return;
    }
  }
}
