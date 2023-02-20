import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '@/system/department/entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from '@/system/department/dto/create-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}
  async addDepartment(createDepartmentDto: CreateDepartmentDto) {
    return;
  }
}
