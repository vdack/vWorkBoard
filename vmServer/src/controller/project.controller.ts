import { Controller, Inject, Get, Query } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { ProjectService } from "../service/project.service";
@Controller('/project')
export class ProjectController {
  @Inject()
  ctx: Context;

  @Inject()
  projectService: ProjectService;

  @Get('/projects')
  async getProjects(@Query('uid') uid) {
    const projects = await this.projectService.getProjects(Number(uid));
    return {name: 'getProjects', code: '200', status: 200, data: projects};
  }
  @Get('/users')
  async getUsers(@Query('pid') pid) {
    const users = await this.projectService.getUsers(Number(pid));
    return {name: 'getUsers', code: '200', status: 200, data: users};
  }
  @Get('/subProjects')
  async getSubProjects (@Query('pid') pid) {
    const subProjects = await this.projectService.getSubProjects(Number(pid));
    return {name: 'getSubProjects', code: '200', status: 200, data: subProjects};
  }
  @Get('/tasks')
  async getTasks (@Query('spid') spid) {
    const tasks = await this.projectService.getTasks(Number(spid));
    return {name: 'getTaks', code: '200', status: 200, data: tasks};
  }
  @Get('/comments')
  async getComments (@Query('tid') tid) {
    const comments = await this.projectService.getComments(Number(tid));
    return {name: 'getComments', code: '200', status: 200, data: comments};
  }
};
