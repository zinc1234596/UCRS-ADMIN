import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('ucrs'); // 修改全局路由前缀
  app.useGlobalInterceptors(new TransformInterceptor()); // 统一响应体格式
  await app.listen(1357); // 修改全局端口
}
bootstrap();
