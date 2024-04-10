import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as findWorkspaceRoot from 'find-yarn-workspace-root';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

config({ path: `${findWorkspaceRoot()}/.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
