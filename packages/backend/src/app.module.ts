import { Module } from '@nestjs/common';
import { AppController } from '@backend/app.controller';
import { AppService } from '@backend/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@backend/config/database.config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(databaseConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
