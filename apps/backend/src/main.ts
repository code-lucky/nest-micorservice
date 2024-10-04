import { NestFactory } from '@nestjs/core';
import { BackendModule } from './backend.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import {
  UnloginFilter,
  CustomExceptionFilter,
  FormatDatetimeInterceptor,
  FormatResponseInterceptor,
  InvokeRecordInterceptor,
 } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BackendModule);

  // 开启跨域处理
  app.enableCors();

  // 全局启用
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new CustomExceptionFilter(), new UnloginFilter());
  app.useGlobalInterceptors(new FormatDatetimeInterceptor(), new FormatResponseInterceptor(), new InvokeRecordInterceptor())
  
  // 这里设置请求体的大小限制，例如50mb
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(3002);
}
bootstrap();
