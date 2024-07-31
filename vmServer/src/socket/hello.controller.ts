import { Inject, OnWSConnection, OnWSDisConnection, OnWSMessage, WSBroadCast, WSController } from "@midwayjs/core";
import { Context } from "@midwayjs/ws";
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

@WSController()
export class HelloSocketController {
  @Inject()
  ctx: Context;

  private fileStoragePath = path.join(__dirname, 'files');

  constructor() {
    // Ensure the file storage directory exists
    if (!fs.existsSync(this.fileStoragePath)) {
      fs.mkdirSync(this.fileStoragePath);
    }
  }

  @OnWSConnection()
  async onConnectionMethod(socket: Context, request: http.IncomingMessage) {
    console.log('namespace / got a connection');
    // Send the list of files on connection
    this.sendFileList();
  }

  @OnWSDisConnection()
  async disconnect(id: number) {
    console.log('disconnect', id);
  }

  @OnWSMessage('/upload')
  async getFile(data: any) {
    const parsedData = JSON.parse(data);
    const { fileName, fileData } = parsedData;
    console.log('on upload: ', fileName);
    // Decode base64 file data
    const fileBuffer = Buffer.from(fileData.split(',')[1], 'base64');

    // Save the file to the server
    const filePath = path.join(this.fileStoragePath, fileName);
    fs.writeFileSync(filePath, fileBuffer);

    console.log(`File uploaded: ${fileName}`);

    // Broadcast the updated file list to all connected clients
    this.broadcastFileList();

    return { type: 'upload', status: 'success' };
  }

  @OnWSMessage('listFiles')
  async listFiles() {
    this.sendFileList();
  }

  @OnWSMessage('download')
  async downloadFile(data: any) {
    const { fileName } = JSON.parse(data);

    const filePath = path.join(this.fileStoragePath, fileName);

    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      const fileData = fileBuffer.toString('base64');

      this.ctx.send(JSON.stringify({ type: 'download', fileName, fileData }));
    } else {
      this.ctx.send(JSON.stringify({ type: 'error', message: 'File not found' }));
    }
  }
 @WSBroadCast()
  private sendFileList() {
    const files = fs.readdirSync(this.fileStoragePath);
    this.ctx.send(JSON.stringify({ type: 'listFiles', files }));
  }

  @WSBroadCast()
  private broadcastFileList() {
    const files = fs.readdirSync(this.fileStoragePath);
    this.ctx.send(JSON.stringify({ type: 'listFiles', files }));
  }
}
