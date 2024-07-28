import { Controller, Inject, Get, Query, Post, Body, Del, Patch} from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { ProjectService } from "../service/project.service";
@Controller('/project')
export class ProjectController {
  @Inject()
  ctx: Context;

  @Inject()
  projectService: ProjectService;

  @Get('/projects')
  async getProjects(@Query('uid') uid: number) {
    const projects = await this.projectService.getProjects(uid);
    return {name: 'getProjects', code: '200', status: 200, data: projects};
  }
  @Get('/users')
  async getUsers(@Query('pid') pid: number) {
    const users = await this.projectService.getUsers(pid);
    return {name: 'getUsers', code: '200', status: 200, data: users};
  }

  @Post('/projects')
  async createProject(@Body('uid')uid:number, @Body('name')pname:string) {
    // console.log('uid:', uid, 'name:', pname);
    const res = await this.projectService.createProject(uid, pname);
    return {name: 'createProjects', code: '200', status: 200, data: res};
  }
  @Del('/projects')
  async deleteProject(@Query('pid') pid: number) {
    const res = await this.projectService.deleteProject(pid);
    return {name: 'deleteProjects', code: '200', status: 200, data: res};
  }
  @Patch('/projects')
  async renameProject(@Body('pid')pid: number, @Body('new_name') new_name: string) {
    const res = await this.projectService.renameProject(pid, new_name);
    return {name: 'renameProjects', code: '200', status: 200, data: res};
  }
  @Del('/project_user')
  async quitProject(@Query('pid') pid: number, @Query('uid') uid: number) {

    const res = await this.projectService.quitProject(uid, pid);
    console.log('uid: ', uid, 'quit pid: ', pid);
    return {name: 'quitProject', code: '200', status: 200, data: res};
  }
};
