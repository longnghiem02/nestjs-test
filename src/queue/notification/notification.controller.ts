import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('')
  sendNotification(@Body() data: any) {
    this.notificationService.sendNotification(data);
  }
}
