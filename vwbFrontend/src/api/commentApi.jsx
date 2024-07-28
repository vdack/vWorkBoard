import { commentInterface } from "./axiosConfig";

export const getComments = async (tid) => {
  const res = await commentInterface.get('/comments', {params: {tid: tid}});
  return res.data;
} ;