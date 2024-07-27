import { Project_User } from './../entity/dbRelations';
import {  Provide } from "@midwayjs/core";
import { Repository, In } from "typeorm";
import { User, Project, SubProject, SubTask, TComment } from "../entity/dbEntities";
import { InjectEntityModel } from '@midwayjs/typeorm';
@Provide()
export class ProjectService {
  @InjectEntityModel(User)
  userModel: Repository<User>;
  @InjectEntityModel(Project)
  projectModel: Repository<Project>;
  @InjectEntityModel(Project_User)
  project_userRelation: Repository<Project_User>;
  @InjectEntityModel(SubProject)
  subProjectModel: Repository<SubProject>;
  @InjectEntityModel(SubTask)
  taskModel: Repository<SubTask>;
  @InjectEntityModel(TComment)
  commentModel: Repository<TComment>;

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

  async getSubProjects(pid: number) {
    const findres = await this.subProjectModel.find({
      where: {pid: pid,},
    });
    console.log('by pid: ', pid, 'find subProjects: ', findres);
    return findres;
  }
  async getTasks(spid: number) {
    const findres = await this.taskModel.find({
      where: {spid: spid, },
    });
    console.log('by spid:', spid, 'find tasks: ', findres);
    return findres;
  }
  async getComments(tid: number) {
    const findres = await this.commentModel.createQueryBuilder('comment')
    .leftJoinAndSelect('comment.user', 'user')
    .where('comment.tid = :tid', { tid: tid })
    .select(['comment.cid', 'comment.tid', 'comment.uid', 'user.name', 'comment.content','comment.date'])
    .getMany();

    console.log('by tid:', tid, 'find comments: ', findres);
    return findres.map((c) => {return {cid: c.cid, tid: c.tid, uid: c.uid, user_name: c.user.name, content: c.content, date: c.date}});
  }
};

