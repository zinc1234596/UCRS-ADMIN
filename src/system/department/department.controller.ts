import { Body, Controller, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from '@/system/department/dto/create-department.dto';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('addDepartment')
  @ApiBearerAuth()
  async addRole(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.addDepartment(createDepartmentDto);
  }
}
