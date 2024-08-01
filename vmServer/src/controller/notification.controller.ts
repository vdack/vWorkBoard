import { NotificationService } from './../service/notification.service';
import { Controller, Get, httpError, Inject, Query, Patch, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/notification')
export class NotificationController {
  @Inject()
  ctx: Context;
  @Inject()
  notificationService: NotificationService;

  @Get('/')
  async getNotifications(@Query('uid')uid: number) {
    try {
      const data = await this.notificationService.getNotifications(uid);
      return {name: 'GetNotifications', code: '200', status: 200, data: data};
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }

  }
  @Patch('/')
  async readNotification(@Body('nid')nid: number) {
    try {
      const res = await this.notificationService.readNotification(nid);
      return {name: 'ReadNotification', code: '200', status: 200, data: res};
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }
  }
}
