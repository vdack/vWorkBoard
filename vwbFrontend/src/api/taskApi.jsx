import { taskInterface } from "./axiosConfig";

export const getTasks = async (spid) => {
  const res = await taskInterface.get('/tasks', {params: {spid: spid}});
  return res.data;
};