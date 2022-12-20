import { DataSource, DataSourceOptions } from 'typeorm';
import { getConfig } from '@/utils';

// 设置数据库类型
const databaseType: DataSourceOptions['type'] = 'mongodb';
const { MONGODB_CONFIG } = getConfig();
const MONGODB_DATABASE_CONFIG = {
  ...MONGODB_CONFIG,
  type: databaseType,
  entities: [],
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
