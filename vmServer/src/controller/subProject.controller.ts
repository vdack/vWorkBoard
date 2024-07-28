import { Controller, Get, Inject, Query  } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { SubProjectService } from "../service/subProject.service";

@Controller('/subproject')
export class SubProjectController {
  @Inject()
  ctx: Context;
  @Inject()
  subProjectService: SubProjectService;

  @Get('/subProjects')
  async getSubProjects (@Query('pid') pid) {
    const subProjects = await this.subProjectService.getSubProjects(Number(pid));
    return {name: 'getSubProjects', code: '200', status: 200, data: subProjects};
  }
};
