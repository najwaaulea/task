import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const result = {
        event: "user.validation_failed",
        // Gunakan optional chaining (?.) dan fallback [] 
        // untuk menghindari error 'undefined'
        data: errors.map(error => ({
          field: error.property,
          errors: error.constraints ? Object.values(error.constraints) : [],
        })),
      };
      return new BadRequestException(result);
    },
    stopAtFirstError: true,
  }));

  app.enableCors(); 
  await app.listen(3001);
}
bootstrap();