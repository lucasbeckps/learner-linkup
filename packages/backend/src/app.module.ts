import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@backend/config/database.config';
import { StudentModule } from '@backend/modules/student/student.module';
import { IsUniqueConstraint } from '@backend/validators/isUnique';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig()),
    StudentModule,
  ],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
