import { taskInterface } from "./axiosConfig";

export const getTasks = async (spid) => {
  const res = await taskInterface.get('/tasks', {params: {spid: spid}});
  return res.data;
};

export const createTask = async (spid, header, content) => {
  const data = {spid: spid, header: header, content: content};
  const res = await taskInterface.post('/tasks', data);
  return res.data;
};