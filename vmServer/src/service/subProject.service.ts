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
    return findres;
  }
  async createSubProject(pid: number, name: string, discription: string) {
    const date = Date();
    const data = {pid: pid, name: name, discription: discription, date: date};
    const res = await this.subProjectModel.save(data);
    return res;
  }
  async updateDate(spid: number) {
    const new_date = Date();
    const res = await this.subProjectModel.update({spid: spid}, {last_modified_date: new_date});
    return res;
  }
  async delete(spid: number) {
    const res = await this.subProjectModel.delete({spid:spid});
    return res;
  }
  async edit(spid: number, new_name: string, new_discrption: string) {
    const new_date = Date();
    const res = this.subProjectModel.update({spid: spid}, {name: new_name, discription: new_discrption, last_modified_date: new_date});
    return res;
  }
}
