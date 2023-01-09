import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '@/system/role/dto/create-role.dto';
import { MongoRepository, Repository } from 'typeorm';
import { Role } from '@/system/role/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
  async findRoleByLevel(roleLevel) {
    return await this.roleRepository.findOne({
      where: { roleLevel },
    });
  }
}
