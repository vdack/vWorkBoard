import { TFile } from './../entity/dbEntities';
import { Repository } from 'typeorm';
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';

@Provide()
export class FileService {
  @InjectEntityModel(TFile)
  fileModel: Repository<TFile>;

  async getFiles(tid: number) {
    try {
      const res = await this.fileModel.find({where: {tid: tid}});
      return res;
    } catch(err) {
      throw err;
    }
  }

  async uploadFile(tid: number, name:string, path: string) {
    try {
      const data = {tid: tid, name: name, path: path, date: Date()};
      const res = await this.fileModel.save(data);
      return res;
    } catch(err) {
      throw err;
    }
  }

  async deleteFile(fid: number) {
    //
  }
};
