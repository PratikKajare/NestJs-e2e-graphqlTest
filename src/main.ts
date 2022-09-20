import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApplicationConfig } from './config/interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const appPort = configService.get<ApplicationConfig>('application').port;
  console.log(appPort);

  await app.listen(appPort);
}
bootstrap();
