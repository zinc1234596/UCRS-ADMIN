import { SetMetadata, UseGuards } from '@nestjs/common';
import { RoleAuthGuard } from '@/common/guards/role.auth.guard.service';

export const Public = () => SetMetadata('isPublic', true);

export const RoleAuth = (roleLevel: number) => {
  return (target: object, key?: string, descriptor?: PropertyDescriptor) => {
    SetMetadata('roleAuth', roleLevel)(target, key, descriptor);
    UseGuards(RoleAuthGuard)(target, key, descriptor);
  };
};
