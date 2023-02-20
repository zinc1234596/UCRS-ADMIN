import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '@/system/department/entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from '@/system/department/dto/create-department.dto';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';
import { BusinessException } from '@/common/exceptions/business.exception';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async addDepartment(createDepartmentDto: CreateDepartmentDto) {
    const { departmentName } = createDepartmentDto;
    const existDepartmentName = await this.departmentRepository.findOne({
      where: { departmentName },
    });
    console.log(existDepartmentName);
    if (existDepartmentName) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.DEPARTMENT_NAME_EXIST,
        message: '部门名称已存在',
      });
    }
    const result = await this.departmentRepository.save(createDepartmentDto);
    if (result) {
      return 'add department success!';
    }
  }
}
