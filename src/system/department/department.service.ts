import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '@/system/department/entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from '@/system/department/dto/create-department.dto';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';
import { BusinessException } from '@/common/exceptions/business.exception';
import { DeleteDepartmentDto } from '@/system/department/dto/delete-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async addDepartment(createDepartmentDto: CreateDepartmentDto) {
    const { departmentName } = createDepartmentDto;
    const existDepartment = await this.departmentRepository.findOne({
      where: { departmentName },
    });
    if (existDepartment) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.DEPARTMENT_EXIST,
        message: '部门已存在',
      });
    }
    const result = await this.departmentRepository.save(createDepartmentDto);
    if (result) {
      return 'add department success';
    }
  }

  async deleteDepartment(deleteDepartmentDto: DeleteDepartmentDto) {
    const { id } = deleteDepartmentDto;
    const existDepartment = await this.departmentRepository.findOne({
      where: { id },
    });
    console.log(existDepartment);
    if (existDepartment) {
      const result = await this.departmentRepository.delete(
        deleteDepartmentDto,
      );
      if (result) {
        return 'delete department success';
      }
    }
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.DEPARTMENT_NO_EXIST,
      message: '部门不存在',
    });
  }
}
