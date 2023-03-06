import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from '@/system/department/dto/create-department.dto';
import { UpdateDepartmentDto } from '@/system/department/dto/update-department.dto';
import { RoleAuth } from '@/common/decorator/public.decorator';
import { USER_ROLE_LEVEL } from '@/common/constants/user.role.constants';

@ApiTags('department')
@Controller('department')
@ApiBearerAuth()
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('create')
  @RoleAuth(USER_ROLE_LEVEL.ADMINISTRATOR)
  @ApiOperation({ summary: '新增部门-管理员及以上权限' })
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Delete('delete/:id')
  @RoleAuth(USER_ROLE_LEVEL.ADMINISTRATOR)
  @ApiOperation({ summary: '删除部门-管理员及以上权限' })
  async delete(@Param('id') id: number) {
    return this.departmentService.deleteDepartment(id);
  }

  @Put('update/:id')
  @RoleAuth(USER_ROLE_LEVEL.ADMINISTRATOR)
  @ApiOperation({ summary: '更新部门-管理员及以上权限' })
  async update(
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.updateDepartment(id, updateDepartmentDto);
  }

  @Get('get')
  @ApiOperation({ summary: '获取部门列表' })
  async get() {
    return this.departmentService.getDepartments();
  }
}
