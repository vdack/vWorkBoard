import { TFile } from './../entity/dbEntities';
import { Repository } from 'typeorm';
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';

@Provide()
export class FileService {
  @InjectEntityModel(TFile)
  fileModel: Repository<TFile>;

  async getFiles(tid: number) {
    try {
      const res = await this.fileModel.find({ where: { tid: tid } });
      return res;
    } catch (err) {
      throw err;
    }
  }

  async existFileName(tid: number, name: string) {
    try {
      const res = await this.fileModel.findOneBy({tid: tid, name: name});
      console.log('find ', tid, name, 'res:', res);
      if (res === null) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      throw err;
    }
  }

  async uploadFile(tid: number, name: string, filePath: string) {
    try {
      const data = { tid: tid, name: name, path: filePath, date: Date() };
      const res = await this.fileModel.save(data);
      return res;
    } catch (err) {
      throw err;
    }
  }

  async storeFile(filePath: string, tmpPath: string) {
    try {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      const fileData  =await fs.readFile(tmpPath);
      await fs.writeFile(filePath, fileData);
      return { success: true, path: filePath };
    } catch (err) {
      throw new Error(`Failed to store file: ${err.message}`);
    }
  }

  async deleteFile(fid: number) {
    try {
      const file = await this.fileModel.findOneBy({ fid: fid });
      if (!file) {
        throw new Error('File not found');
      }
      await this.removeFile(file.path);
      const res = await this.fileModel.delete({ fid: fid });
      return { success: true, path: file.path, res: res };
    } catch (err) {
      throw new Error(`Failed to delete file: ${err.message}`);
    }
  }

  async removeFile(filePath: string) {
    try {
      await fs.unlink(filePath);
      return { success: true, path: filePath };
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new Error(`File not found: ${filePath}`);
      } else {
        throw new Error(`Failed to delete file: ${err.message}`);
      }
    }
  }
  async downloadFile(fid: number) {
    try {
      const res = await this.fileModel.findOneBy({fid: fid});
      const filePath = res.path;
      const fileData  =await fs.readFile(filePath);
      return {name: res.name, data: fileData};
    } catch (err) {
      throw err;
    }
  }
}


