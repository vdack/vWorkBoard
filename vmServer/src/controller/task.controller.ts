import { Body, Controller, Get, Inject, Query, Post, httpError, Patch, Del  } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { TaskService } from "../service/task.service";
import { SubProjectService } from "../service/subProject.service";
@Controller('/task')
export class SubProjectController {
  @Inject()
  ctx: Context;
  @Inject()
  taskService: TaskService;
  @Inject()
  subProjectService: SubProjectService;

  @Get('/tasks')
  async getTasks (@Query('spid') spid) {
    const tasks = await this.taskService.getTasks(Number(spid));
    return {name: 'getTasks', code: '200', status: 200, data: tasks};
  }

  @Post('/tasks')
  async createTask (@Body('spid') spid: number, @Body('header') header: string, @Body('content') content: string) {
    try {
      const createPromise = this.taskService.createTask(spid, header, content);
      const updatePromise = this.subProjectService.updateDate(spid);
      const [createRes, updateRes] = await Promise.all([createPromise, updatePromise]);
      return {name: 'createTask', code: '200', status: 200, data: {createRes, updateRes}};
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error');
    }
  }

  @Patch('/tasks')
  async editTask (@Body('tid')tid: number, @Body('header')header: string, @Body('content') content: string, @Body('finished')finished: boolean) {
    try {
      console.log('current finished: ', finished);
      const res = await this.taskService.editTask(tid, header, content, finished);
      console.log('edit task: ', res);
      return {name: 'editTask', code:'200', status: 200, data: res};
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error');
    }
  }
  @Del('/tasks')
  async deleteTask (@Query('tid') tid: number) {
    try {
      const res = await this.taskService.deleteTask(tid);
      return {name: 'deleteTask', code: '200', status: 200, data: res};
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error');
    }
  }

};
