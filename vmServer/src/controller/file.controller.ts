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
      return { name: 'getFiles', code: '200', status: 200, data: res };
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }
  }

  @Post()
  async uploadFile(
    @Files() file: any,
    @Fields() field: any,
  ) {
    // try {
    const tid = field.tid;
    const name = file[0].filename;
      // 文件存储路径，假设根目录是项目的根目录
      console.log('get a file:',file,'---with:',  tid, name, field);
      const filePath = path.join(__dirname, '../uploads', String(tid), name);
      console.log('upload a file:', filePath);
      // 上传文件的元数据存储到数据库中
      await this.fileService.uploadFile(tid, name, filePath);

      // 存储文件数据到文件系统
      await this.fileService.storeFile(filePath, file[0].data);

      return { name: 'uploadFile', code: '200', status: 200, data: {} };
    // } catch (err) {
    //   return new httpError.RequestTimeoutError('Unknown Error!');
    // }
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
}
