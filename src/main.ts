import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // transform payload to Dto instance
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
