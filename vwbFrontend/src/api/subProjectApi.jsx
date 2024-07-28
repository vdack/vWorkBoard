import { subProjectInterface } from "./axiosConfig";

export const getSubProjects = async (pid) => {
    const res = await subProjectInterface.get('/subProjects', {params:{pid: pid}});
    return res.data;
  }