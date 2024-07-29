import { subProjectInterface } from "./axiosConfig";

export const getSubProjects = async (pid) => {
  const res = await subProjectInterface.get('/subProjects', {params:{pid: pid}});
  return res.data;
};
export const createSubProjects = async (pid, name, discription) => {
  const data = {pid, name, discription};
  const res = await subProjectInterface.post('/subProjects', data);
  return res.data;
};
export const deleteSubProjects = async (spid) => {
  const res = await subProjectInterface.delete('/subProjects', {params: {spid: spid}});
  return res.data;
};
export const editSubProject = async (spid, new_name, new_discription) => {
  const data = {spid: spid, name: new_name, discription: new_discription};
  const res = await subProjectInterface.patch('/subProjects', data);
  return res.data;
};