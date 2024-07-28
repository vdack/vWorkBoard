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

};
