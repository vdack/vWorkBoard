import { Project_User } from './../entity/dbRelations';
import {  Provide } from "@midwayjs/core";
import { Repository, In } from "typeorm";
import { User, Project,  } from "../entity/dbEntities";
import { InjectEntityModel } from '@midwayjs/typeorm';
@Provide()
export class ProjectService {
  @InjectEntityModel(User)
  userModel: Repository<User>;
  @InjectEntityModel(Project)
  projectModel: Repository<Project>;
  @InjectEntityModel(Project_User)
  project_userRelation: Repository<Project_User>;
  // @InjectEntityModel(SubProject)
  // subProjectModel: Repository<SubProject>;
  // @InjectEntityModel(SubTask)
  // taskModel: Repository<SubTask>;
  // @InjectEntityModel(TComment)
  // commentModel: Repository<TComment>;

  async getProjects(uid:number) {
    const findres = await this.project_userRelation.find({
      where: {
        uid: uid,
      }
    });
    console.log('by uid:', uid, 'find projects: ', findres);
    const pids = findres.map((r) => {return r.pid});
    if (pids.length > 0) {
      const find_ps = await this.projectModel.find({
        where: {pid: In(pids),},
      });
      console.log('find ps:', find_ps);
      return find_ps;
    } else {
      return [];
    }
  }

  async getUsers(pid: number) {
    const findres = await this.project_userRelation.find({
      where: {pid: pid,},
    });

    const uids = findres.map((u) => {return u.uid});
    if (uids.length > 0) {
      const find_us = await this.userModel.find({
        where: {uid: In(uids), },
        select: ['uid', 'name'],
      });
      console.log('by pid: ', pid, 'find users: ', find_us);
      return find_us;
    } else {
      return [];
    }
  }

};

