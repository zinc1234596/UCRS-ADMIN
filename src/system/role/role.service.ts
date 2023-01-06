import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '@/system/role/dto/create-role.dto';
import { MongoRepository } from 'typeorm';
import { Role } from '@/system/role/entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,
  ) {}
  async newRole(createRoleDto: CreateRoleDto) {
    const result = await this.roleRepository.save(createRoleDto);
    if (result) {
      return 'new role success!';
    }
  }
}
