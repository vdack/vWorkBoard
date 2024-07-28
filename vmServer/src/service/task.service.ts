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
}
