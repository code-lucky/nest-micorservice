import { NestFactory } from '@nestjs/core';
import { BackendModule } from './backend.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { 
  FormatDatetimeInterceptor,
  FormatResponseInterceptor,
  InvokeRecordInterceptor,
  UnloginFilter,
  CustomExceptionFilter
 } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BackendModule);

  app.useGlobalPipes(new ValidationPipe());

  // 开启跨域处理
  app.enableCors();

  // 全局启用
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new FormatDatetimeInterceptor())
  app.useGlobalInterceptors(new FormatResponseInterceptor())
  app.useGlobalInterceptors(new InvokeRecordInterceptor())
  app.useGlobalFilters(new UnloginFilter())
  app.useGlobalFilters(new CustomExceptionFilter())

  
  // 这里设置请求体的大小限制，例如50mb
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(3002);
}
bootstrap();
