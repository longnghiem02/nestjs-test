import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { redisConfig } from 'src/configs/app.config';
import { TestConnectRedis } from './test-connect.redis';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: redisConfig.HOST,
        port: Number(redisConfig.PORT),
      },
    }),
    BullModule.registerQueue({ name: 'myQueue' }),
  ],
  providers: [TestConnectRedis],
})
export class ConnectRedisModule {}
