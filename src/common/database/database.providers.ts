import { DataSource, DataSourceOptions } from 'typeorm';
import { getConfig } from '@/common/utils';
import { User } from '@/system/user/entities/user.entity';
import { Role } from '@/system/role/entities/role.entity';

// 设置数据库类型
const databaseType: DataSourceOptions['type'] = 'mongodb';
const { MONGODB_CONFIG } = getConfig();
const MONGODB_DATABASE_CONFIG = {
  ...MONGODB_CONFIG,
  type: databaseType,
  entities: [User, Role],
};
const MONGODB_DATA_SOURCE = new DataSource(MONGODB_DATABASE_CONFIG);

// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    useFactory: async () => {
      await MONGODB_DATA_SOURCE.initialize();
      return MONGODB_DATA_SOURCE;
    },
  },
];
