import { InjectQueue } from '@nestjs/bull';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TestConnectRedis implements OnModuleInit {
  constructor(@InjectQueue('myQueue') private readonly myQueue: Queue) {}

  async onModuleInit() {
    try {
      await this.myQueue.client.ping();
      console.log('Redis is connected!');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
    } finally {
      await this.myQueue.close();
    }
  }
}
