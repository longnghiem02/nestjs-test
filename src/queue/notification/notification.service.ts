import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue('notificationQueue')
    private notificationQueue: Queue,
  ) {}

  sendNotification(data: any) {
    this.notificationQueue.add(data);
  }

  processNotificationJob(job: any) {
    // Process the notification job here
    console.log('Processing notification job', job);
  }
}
