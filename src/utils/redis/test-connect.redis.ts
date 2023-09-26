import { InjectQueue } from '@nestjs/bull';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TestConnectRedis implements OnModuleInit {
  constructor(
    @InjectQueue('testConnectQueue')
    private readonly testConnectQueue: Queue,
  ) {}

  async onModuleInit() {
    try {
      await this.testConnectQueue.client.ping();
      console.log('Redis is connected!');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
    } finally {
      await this.testConnectQueue.close();
    }
  }
}
