import { Controller, Get, Inject, Query  } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { TaskService } from "../service/task.service";
@Controller('/task')
export class SubProjectController {
  @Inject()
  ctx: Context;
  @Inject()
  taskService: TaskService;
  @Get('/tasks')
  async getTasks (@Query('spid') spid) {
    const tasks = await this.taskService.getTasks(Number(spid));
    return {name: 'getTasks', code: '200', status: 200, data: tasks};
  }
};
