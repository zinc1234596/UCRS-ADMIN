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
    const requiredRoleLevel = this.reflector.get<number>(
      'roleAuth',
      context.getHandler(),
    );
    if (!requiredRoleLevel) {
      return true;
    }

    const request = context.switchToHttp().getRequest().user;
    console.log(
      `roleLevel:${request.role.roleLevel} limitLevel:${requiredRoleLevel}`,
    );
    if (request.role.roleLevel >= requiredRoleLevel) {
      return true;
    } else {
      throw new HttpException('角色权限不足', HttpStatus.FORBIDDEN);
      //至于抛出事务异常是否更好，这取决于你的应用程序的具体情况。
      // 如果你希望捕获和处理业务逻辑中的错误，那么使用自定义异常是一个不错的选择。
      // 如果你不想让错误向上传播，那么可以在异常处理程序中捕获和处理它们。
      // 如果你希望向上抛出错误并由框架处理它们，则可能需要使用标准的 HTTP 异常。
    }
  }
}
