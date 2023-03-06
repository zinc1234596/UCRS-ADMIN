import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '@/system/department/entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from '@/system/department/dto/create-department.dto';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';
import { BusinessException } from '@/common/exceptions/business.exception';
import { DeleteDepartmentDto } from '@/system/department/dto/delete-department.dto';
import { UpdateDepartmentDto } from '@/system/department/dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
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
      return;
    }
  }

  async deleteDepartment(id: number) {
    const existDepartment = await this.findDepartmentById(id);
    if (existDepartment) {
      const result = await this.departmentRepository.remove(existDepartment);
      if (result) {
        return 'delete department success';
      }
    }
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.DEPARTMENT_NO_EXIST,
      message: '部门不存在',
    });
  }

  async updateDepartment(id, updateDepartmentDto: UpdateDepartmentDto) {
    const { departmentName, description } = updateDepartmentDto;
    const departmentId = id;
    const existDepartment = await this.findDepartmentById(departmentId);
    if (existDepartment) {
      try {
        const result = await this.departmentRepository.update(
          { id: departmentId },
          { departmentName, description },
        );
        console.log(result);
        if (result && result.affected > 0) {
          return 'update department success';
        }
      } catch (error) {
        console.log(error);
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.DEPARTMENT_UPDATE_FAILED,
          message: '部门更新失败',
        });
      }
    }
  }

  async findDepartmentById(id) {
    return await this.departmentRepository.findOne({
      where: { id },
    });
  }

  async getDepartmentList() {
    return await this.departmentRepository.find();
  }
}
