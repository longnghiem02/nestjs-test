import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { NotificationService } from './notification.service';

@Processor('notificationQueue')
export class NotificationProcessor {
  constructor(private notificationService: NotificationService) {}
  @Process()
  handleNotificationJob(job: Job) {
    this.notificationService.processNotificationJob(job.data);
  }
}
