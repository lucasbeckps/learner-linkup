import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as findWorkspaceRoot from 'find-yarn-workspace-root';

config({ path: `${findWorkspaceRoot()}/.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
