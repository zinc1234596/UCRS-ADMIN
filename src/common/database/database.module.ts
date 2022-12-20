import { DatabaseProviders } from '@/common/database/database.providers';
import { Module } from '@nestjs/common';

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule {}
