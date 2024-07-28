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
export const createProject = async ({uid, pname}) => {
  const usr_pjct = {uid: uid, name: pname};
  const res = await projectInterface.post('/create', usr_pjct);
  return res.data;
}