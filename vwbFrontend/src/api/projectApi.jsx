import { projectInterface } from "./axiosConfig";

export const getProjects = async (uid) => {
  const response = await projectInterface.get('/projects', {params:{uid: uid}});
  return response.data;
}
export const getUsers = async (pid) => {
  console.log('interface get users, pid: ', pid);
  const res = await projectInterface.get('/users', {params:{pid:pid}});
  return res.data;
}
export const getSubProjects = async (pid) => {
  const res = await projectInterface.get('/subProjects', {params:{pid: pid}});
  return res.data;
}
