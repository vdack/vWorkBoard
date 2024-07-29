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
  const res = await projectInterface.post('/projects', usr_pjct);
  return res.data;
}
export const deleteProject = async (pid) => {
  const res = await projectInterface.delete('/projects', {params:{pid: pid}});
  return res.data;
}
export const renameProject = async (pid, new_name) => {
  const res = await projectInterface.patch('/projects', {pid: pid, new_name: new_name});
  return res.data;
};
export const quitProject = async (uid, pid) => {
  console.log(uid, ' quit ', pid);
  const res = await projectInterface.delete('/project_user', {params: {uid: uid, pid: pid}});
  return res.data;
};
export const projectAddUser = async (user_name, pid) => {
  
  const data = {user_name: user_name, pid: pid};
  const res = await projectInterface.post('/project_user', data);
  console.log(user_name, 'add to', pid, 'res', res);
  return res.data;
};