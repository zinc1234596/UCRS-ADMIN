import { User } from '@/user/entities/user.entity';

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(User),
    inject: ['MONGODB_DATA_SOURCE'],
  },
];
