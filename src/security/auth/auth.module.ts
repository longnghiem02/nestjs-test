import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountModule } from 'src/modules/account/account.module';
import { jwtConfig } from 'src/configs/app.config';
import { RolesGuard } from 'src/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      global: true,
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
