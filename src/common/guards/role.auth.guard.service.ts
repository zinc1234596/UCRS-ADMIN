import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoleLevel = this.reflector.get<{
      roleLevel: number;
      guards: any[];
    }>('roleAuth', context.getHandler());
    if (!requiredRoleLevel) {
      return true;
    }

    const request = context.switchToHttp().getRequest().user;
    console.log(
      `roleLevel:${request.role.roleLevel} limitLevel:${requiredRoleLevel.roleLevel}`,
    );
    if (request.role.roleLevel >= requiredRoleLevel.roleLevel) {
      return true;
    } else {
      throw new HttpException('角色权限不足', HttpStatus.FORBIDDEN);
    }
  }
}
