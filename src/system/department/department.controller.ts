import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from '@/system/department/dto/create-department.dto';
import { DeleteDepartmentDto } from '@/system/department/dto/delete-department.dto';
import { UpdateDepartmentDto } from '@/system/department/dto/update-department.dto';
import { RoleAuth } from '@/common/decorator/public.decorator';
import { RoleAuthGuard } from '@/common/guards/role.auth.guard.service';
import { USER_ROLE_LEVEL } from '@/common/constants/user.role.constants';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('addDepartment')
  @RoleAuth(USER_ROLE_LEVEL.MANAGER)
  @UseGuards(RoleAuthGuard)
  @ApiBearerAuth()
  async addDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.addDepartment(createDepartmentDto);
  }

  @Post('deleteDepartment')
  @ApiBearerAuth()
  async deleteDepartment(@Body() deleteDepartmentDto: DeleteDepartmentDto) {
    return this.departmentService.deleteDepartment(deleteDepartmentDto);
  }

  @Post('updateDepartment')
  @ApiBearerAuth()
  async updateDepartment(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.updateDepartment(updateDepartmentDto);
  }
}
