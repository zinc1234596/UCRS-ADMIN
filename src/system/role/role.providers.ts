import { Role } from '@/system/role/entities/role.entity';

export const RoleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Role),
    inject: ['MONGODB_DATA_SOURCE'],
  },
];
