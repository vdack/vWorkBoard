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

  async createProject(uid: number, projectName: string) {
    const project = new Project();
    project.name = projectName;
    const p = await this.projectModel.save(project);
    console.log('create project: ', p);
    const pjct_usr = new Project_User();
    const date = new Date();
    console.log('current date:', date);
    pjct_usr.uid = uid;
    pjct_usr.pid = p.pid;
    pjct_usr.date = date;
    const p_u = await this.project_userRelation.save(pjct_usr);
    return {project: p, pjct_usr: p_u};
  }

  async deleteProject(pid: number) {
    const del = await this.projectModel.delete({pid: pid});
    console.log('by pid: ', pid, 'delete: ', del);
    const quit = await this.project_userRelation.delete({pid: pid});
    return {delInfo: del, quitInfo: quit};
  }
  async renameProject(pid: number, new_name: string) {
    const res = await this.projectModel.update({pid: pid}, {name: new_name});
    console.log('with pid: ', pid, 'renamed: ', new_name);
    return res;
  }
  async quitProject(uid: number, pid: number) {
    console.log('uid:', uid, 'quit pid: ', pid);
    const res = await this.project_userRelation.delete({uid: uid, pid: pid});
    const findres = await this.project_userRelation.findAndCount({where: {pid: pid}});
    let removeProject = false;
    let del = {};
    if (findres[1] === 0) {
      removeProject = true;
      del = await this.projectModel.delete({pid: pid});
    }
    return {res, removeProject, del};
  }
  async addUser (user_name: string, pid: number): Promise<any>{
    console.log('user:', user_name, 'add to pid:', pid);

    const find = await this.userModel.findOneBy({name: user_name});
    if (find === null) {
      return {find: false, data: {}};
    }
    const data = {uid: find.uid, pid: pid, date: Date()};
    const res = await this.project_userRelation.save(data);
    return {find: true, date: res};
  }
};

