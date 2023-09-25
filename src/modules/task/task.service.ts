import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/utils/constants/message.constants';
import { Task } from './model/task.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  handleCreateTask = async (data: any): Promise<HttpResponse> => {
    try {
      await this.taskRepository.save({
        name: data.name,
        detail: data.detail,
      });
      return HttpResponse(201, CommonMessage.CREATE_TASK_SUCCCEED);
    } catch (error) {
      return HttpResponse(500, error);
    }
  };

  handleAssignTask = async (data: any): Promise<HttpResponse> => {
    try {
      const response = await this.taskRepository.findOneBy({ id: data.id });
      if (response) {
        await this.taskRepository.save({
          ...response,
          ...data,
          updatedAt: new Date(),
        });
        return HttpResponse(201, CommonMessage.ASSIGN_TASK_SUCCCEED);
      }
      return HttpResponse(201, ErrorMessage.TASK_NOT_FOUND);
    } catch (error) {
      return HttpResponse(500, error);
    }
  };
}
