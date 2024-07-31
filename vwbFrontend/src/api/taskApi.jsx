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

export const editTask = async (tid, header, content, finished) => {
  const data = {tid: tid, header: header, content: content, finished: finished};
  const res = await taskInterface.patch('/tasks', data);
  return res.data;
}

export const deleteTask = async (tid) => {
  const res = await taskInterface.delete('tasks', {params:{tid: tid}});
  return res.data;
};