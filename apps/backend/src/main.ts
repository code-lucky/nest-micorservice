import { NestFactory } from '@nestjs/core';
import { BackendModule } from './backend.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatDatetimeInterceptor } from 'interceptors/format-datetime.interceptor';
import { FormatResponseInterceptor } from 'interceptors/format-response.interceptor';
import { InvokeRecordInterceptor } from 'interceptors/invoke-record.interceptor';

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

  await app.listen(3002);
}
bootstrap();
