import { Body, Controller, Get, Inject, Query, Post, httpError,Del, Patch  } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { SubProjectService } from "../service/subProject.service";

@Controller('/subproject')
export class SubProjectController {
  @Inject()
  ctx: Context;
  @Inject()
  subProjectService: SubProjectService;

  @Get('/subProjects')
  async getSubProjects (@Query('pid') pid: number) {
    const subProjects = await this.subProjectService.getSubProjects(Number(pid));
    return {name: 'getSubProjects', code: '200', status: 200, data: subProjects};
  };

  @Post('/subProjects')
  async createSubProjects(@Body('pid') pid: number, @Body('name') name: string, @Body('discription')discription: string){
    try {
      const res = await this.subProjectService.createSubProject(pid, name, discription);
      return {name: 'createSubProjects', code:'200', status: 200, data: res};
    } catch(err) {
      console.log('Unknown Error for', err);
      return new httpError.RequestTimeoutError('Unknown Error');
    }
  }

  @Del('/subProjects')
  async deleteSubProjects(@Query('spid') spid: number) {
    try {
      const res = await this.subProjectService.delete(spid);
      return {name: 'deleteSubProjects', code: '200', status: 200, data: res};
    } catch (err) {
      console.log('Error for', err);
      return new httpError.RequestTimeoutError('Unknown Error');
    }
  }

  @Patch('/subProjects')
  async editSubProjects(@Body('spid') spid: number, @Body('name') name: string, @Body('discription') discription: string) {
    try {
      const res = await this.subProjectService.edit(spid, name, discription);
      return {name: 'editSubProject', code: '200', status: 200, data: res};
    } catch (err) {
      console.log('Error for:', err);
      return new httpError.RequestTimeoutError('Unknown Error');
    }
  }

};
