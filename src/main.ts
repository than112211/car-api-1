import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './shared/filters/bad-request.filter';
import { UnauthorizedExceptionFilter } from './shared/filters/unauthorized.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  app.useGlobalFilters(
    new BadRequestExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );

  await app.listen(4000);
}
bootstrap();
