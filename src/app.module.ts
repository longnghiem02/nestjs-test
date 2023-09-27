import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AuthModule } from './security/auth/auth.module';
import { AuthService } from './security/auth/auth.service';
import { AuthController } from './security/auth/auth.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectDBModule } from './database/connect.database';
import { AccountModule } from './modules/account/account.module';
import { TaskModule } from './modules/task/task.module';
import { ConnectRedisModule } from './utils/redis/connect.redis';
import { UploadModule } from './modules/upload/upload.module';
import { CloudflareModule } from './cloudflare/cloudflare.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    ConnectDBModule,
    ConnectRedisModule,
    AuthModule,
    AccountModule,
    TaskModule,
    UploadModule,
    CloudflareModule,
  ],
  controllers: [AuthController, AppController],
  providers: [AuthService, AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
