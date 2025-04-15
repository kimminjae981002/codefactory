import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validator 검증 (class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 없는 필드를 작성하면 무시
      forbidNonWhitelisted: true, // 없는 필드를 작성하면 에러
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
