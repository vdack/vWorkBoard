import { Provide } from '@midwayjs/core';
import { SubProject } from './../entity/dbEntities';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class SubProjectService {
  @InjectEntityModel(SubProject)
  subProjectModel: Repository<SubProject>;

  async getSubProjects(pid: number) {
    const findres = await this.subProjectModel.find({
      where: {pid: pid,},
    });
    console.log('by pid: ', pid, 'find subProjects: ', findres);
    return findres;
  }
}
