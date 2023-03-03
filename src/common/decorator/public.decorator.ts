import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);

export const RoleAuth = (options: { roleLevel: number; guards: any[] }) =>
  SetMetadata('roleAuth', options);
