import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { AllExceptionsFilter } from '@/common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from '@/common/exceptions/http.exception.filter';
import { generateDocument } from '@/doc';
import { ValidationPipe } from '@nestjs/common';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // HMR热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // 全局路由前缀
  app.setGlobalPrefix('ucrs');
  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 自动验证请求参数
  app.useGlobalPipes(new ValidationPipe());
  // 全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  // 创建swagger文档
  generateDocument(app);
  // 端口
  app.enableCors();
  await app.listen(1357); // 修改全局端口
}
bootstrap();
