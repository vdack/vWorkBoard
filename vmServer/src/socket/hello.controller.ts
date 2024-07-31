import { Inject, OnWSConnection, WSController } from "@midwayjs/core";
import { Context } from "@midwayjs/ws";
import * as http from 'http';

@WSController()
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @OnWSConnection()
  async onConnectionMethod(socket: Context, request: http.IncomingMessage) {
    console.log('namespace / got a connection ');
  }
};
