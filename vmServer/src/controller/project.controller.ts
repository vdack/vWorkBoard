import { UserService } from './../service/user.service';
import { Controller, Inject, Get, Query, Post, Body, Del, Patch} from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { ProjectService } from "../service/project.service";
import { httpError } from "@midwayjs/core";
import { NotificationService } from "../service/notification.service";
@Controller('/project')
export class ProjectController {
  @Inject()
  ctx: Context;

  @Inject()
  projectService: ProjectService;

  @Inject()
  notificationService: NotificationService;

  @Inject()
  userService: UserService;

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
    try {
      const res = await this.projectService.renameProject(pid, new_name);
      return {name: 'renameProjects', code: '200', status: 200, data: res};
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }
  }
  @Del('/project_user')
  async quitProject(@Query('pid') pid: number, @Query('uid') uid: number) {
    try {
      const p_res = this.projectService.quitProject(uid, pid);
      const p_user = this.userService.getUserById(uid);
      const p_project = this.projectService.getProjectByPid(pid);
      const [res, user, project] = await Promise.all([p_res, p_user, p_project]);
      await this.notificationService.addNotifications(uid, pid, user.name + ' quit ' + project.name);
      return {name: 'quitProject', code: '200', status: 200, data: res};
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }

  }
  @Post('/project_user')
  async addUser(@Body('pid') pid: number, @Body('user_name') user_name: string) {
    const res = await this.projectService.addUser(user_name, pid);
    console.log(user_name, 'add ', pid, 'res: ', res);
    if (res.find) {
      return {name: 'addUser', code: '200', status: 200, data: res.data};
    }
    return new httpError.NotFoundError('Not Found User' + user_name);

  }

};
