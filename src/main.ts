import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('ucrs'); // 修改全局路由前缀
  await app.listen(1357); // 修改全局端口
}
bootstrap();
