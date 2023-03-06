import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
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

  @Post('create')
  @RoleAuth(USER_ROLE_LEVEL.ASSISTANT)
  @UseGuards(RoleAuthGuard)
  @ApiBearerAuth()
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Delete('/delete/:id')
  @ApiBearerAuth()
  async deleteDepartment(@Param('id') id: number) {
    return this.departmentService.deleteDepartment(id);
  }

  @Put('/update/:id')
  @ApiBearerAuth()
  async updateDepartment(
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.updateDepartment(id, updateDepartmentDto);
  }

  @Get('get')
  @ApiBearerAuth()
  async getDepartmentList() {
    return this.departmentService.getDepartmentList();
  }
}
