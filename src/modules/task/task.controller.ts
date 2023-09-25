import { Controller, Post, Put, Body } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/utils/constants/role.constants';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { AssignTaskDTO } from './dto/assign-task.dto';

@Controller('api')
export class TaskController {
  constructor(private accountService: TaskService) {}

  @Post('create-task')
  @Roles(Role.ADMIN)
  createTask(@Body() createTasktDTO: CreateTaskDTO) {
    return this.accountService.handleCreateTask(createTasktDTO);
  }

  @Put('assign-task')
  @Roles(Role.ADMIN)
  assignTask(@Body() assignTasktDTO: AssignTaskDTO) {
    return this.accountService.handleAssignTask(assignTasktDTO);
  }
}
