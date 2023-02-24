import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);

export const RoleAuth = (roleLevel: number) =>
  SetMetadata('roleAuth', roleLevel);
