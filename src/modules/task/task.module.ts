import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Task } from './model/task.model';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { NotificationService } from 'src/queue/notification/notification.service';
import { BullModule } from '@nestjs/bull';
import { NotificationProcessor } from 'src/queue/notification/notification.processor';
import { Account } from '../account/model/account.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Account]),
    BullModule.registerQueue({ name: 'notificationQueue' }),
  ],
  controllers: [TaskController],
  providers: [TaskService, NotificationService, NotificationProcessor],
  exports: [TypeOrmModule.forFeature([Task])],
})
export class TaskModule {}
