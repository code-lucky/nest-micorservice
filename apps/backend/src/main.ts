import { NestFactory } from '@nestjs/core';
import { BackendModule } from './backend.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BackendModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3002);
}
bootstrap();
