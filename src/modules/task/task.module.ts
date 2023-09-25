import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Task } from './model/task.model';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule.forFeature([Task])],
})
export class TaskModule {}
