import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  // const jwtAuthGuard = app.get(JwtAuthGuard);
  // app.useGlobalGuards(jwtAuthGuard);
  await app.listen(3001);
}

bootstrap();
