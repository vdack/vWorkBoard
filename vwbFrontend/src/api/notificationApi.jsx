import { notificationInterface } from "./axiosConfig"

export const getNotifications = async (uid) => {
  const res = await notificationInterface.get('/', {params: {uid: uid}});
  console.log('get Notifications:', res);
  return res.data.data;
}

export const readNotification = async (nid) => {
  await notificationInterface.patch('/', {nid: nid});
}