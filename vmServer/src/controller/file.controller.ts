import { Controller, Get, Inject, Query, Post, Del, httpError, Files, Fields} from "@midwayjs/core";
import { FileService } from "../service/file.service";
import * as path from "path";

@Controller('/file')
export class FileController {
  @Inject()
  fileService: FileService;

  @Get('/lists')
  async getFiles(@Query('tid') tid: number) {
    try {
      const res = await this.fileService.getFiles(tid);
      console.log('get files:', res);
      return { name: 'getFiles', code: '200', status: 200, data: res };
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }
  }

  @Post()
  async uploadFile(@Files() file: any, @Fields() field: any,) {
    try {
      const tid = field.tid;
      let name = file[0].filename;
      let already_exist = await this.fileService.existFileName(tid, name);
      while (already_exist) {
        name = 'new_' + name;
        already_exist = await this.fileService.existFileName(tid, name);
      }
      const filePath = path.join(__dirname, '../uploads', String(tid), name);
      const res = this.fileService.uploadFile(tid, name, filePath);
      const storeInfo = await this.fileService.storeFile(filePath, file[0].data);
      await Promise.all([res, storeInfo]);
      return { name: 'uploadFile', code: '200', status: 200, data: res };
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }
  }

  @Del()
  async deleteFile(@Query('fid') fid: number) {
    try {
      const res = await this.fileService.deleteFile(fid);
      return { name: 'deleteFile', code: '200', status: 200, data: res };
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }
  }

  @Get()
  async downloadFile(@Query('fid') fid: number) {
    try {
      const res = await this.fileService.downloadFile(fid);
      return {name: 'downloadFile', code: '200', status: 200, data: res};
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }
  }
}
