import { AuthModule } from './security/auth/auth.module';
import { AuthService } from './security/auth/auth.service';
import { AuthController } from './security/auth/auth.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectDBModule } from './database/connect.database';
import { AccountModule } from './modules/account/account.module';
import { TaskModule } from './modules/task/task.module';
import { ConnectRedisModule } from './utils/redis/connect.redis';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    ConnectDBModule,
    ConnectRedisModule,
    AuthModule,
    AccountModule,
    TaskModule,
  ],
  controllers: [AuthController, AppController],
  providers: [AuthService, AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
