import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@backend/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@backend/modules/auth/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@backend/modules/auth/auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
})
export class AuthModule {}
