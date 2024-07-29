import { Provide } from '@midwayjs/core';
import { SubTask } from './../entity/dbEntities';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class TaskService {
  @InjectEntityModel(SubTask)
  taskModel: Repository<SubTask>;

  async getTasks(spid: number) {
    const findres = await this.taskModel.find({
      where: {spid: spid,},
    });
    console.log('by spid: ', spid, 'find Tasks: ', findres);
    return findres;
  }

  async createTask(spid: number, header: string, content: string): Promise<any>{
    try {
      const data = {spid: spid, header: header, content: content, finished: false, created_date: Date()};
      const res = this.taskModel.save(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
}
