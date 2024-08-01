import { Provide } from '@midwayjs/core';
import { Notification } from './../entity/dbEntities';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class NotificationService {
  @InjectEntityModel(Notification)
  notificationModel: Repository<Notification> ;

  async getNotifications(uid: number) {
    try {
      const res = await this.notificationModel.find({where: {uid: uid}});
      const counter = res.reduce((acc, noti) => {if (noti.read) {return acc;} return acc + 1;}, 0);
      return {counter: counter, notifications: res};
    } catch (err) {
      throw err;
    }
  }

  async addNotifications(uid: number, pid: number, action: string) {
    try {
      const data = {uid: uid, pid: pid, action:action, date: Date()};
      console.log('add notifications:', data);
      const res = await this.notificationModel.save(data);
      return res;
    } catch (err) {
      throw err;
    }
  }

  async readNotification(nid: number) {
    try {
      const res = await this.notificationModel.update({nid: nid}, {read: true});
      return res;
    } catch (err) {
      throw err;
    }
  }


}
