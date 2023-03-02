import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from '@/system/department/dto/create-department.dto';
import { DeleteDepartmentDto } from '@/system/department/dto/delete-department.dto';
import { UpdateDepartmentDto } from '@/system/department/dto/update-department.dto';
import { RoleAuth } from '@/common/decorator/public.decorator';
import { RoleAuthGuard } from '@/common/guards/role.auth.guard.service';
import { USER_ROLE_LEVEL } from '@/common/constants/user.role.constants';
import { Department } from '@/system/department/entities/department.entity';
import { FetchDepartmentDto } from '@/system/department/dto/fetch-department.dto';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('addDepartment')
  @UseGuards(RoleAuthGuard)
  @RoleAuth(USER_ROLE_LEVEL.DIRECTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: '添加部门' })
  async addDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.addDepartment(createDepartmentDto);
  }

  @Post('deleteDepartment')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除部门' })
  async deleteDepartment(@Body() deleteDepartmentDto: DeleteDepartmentDto) {
    return this.departmentService.deleteDepartment(deleteDepartmentDto);
  }

  @Post('updateDepartment')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更改部门' })
  async updateDepartment(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.updateDepartment(updateDepartmentDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '分页查询部门' })
  async getDepartmentsWithPagination(
    @Query() query: FetchDepartmentDto,
  ): Promise<{ departments: Department[]; total: number }> {
    return this.departmentService.findAllDepartmentsWithPagination(
      query.page,
      query.limit,
    );
  }
}
