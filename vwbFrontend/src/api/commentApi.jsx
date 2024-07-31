import { commentInterface } from "./axiosConfig";

export const getComments = async (tid) => {
  const res = await commentInterface.get('/comments', {params: {tid: tid}});
  return res.data;
} ;

export const createComment = async (tid, uid, content) => {
  const data = {tid: tid, uid: uid, content: content};
  const res = await commentInterface.post('/comments', data);
  return res.data;
};

export const deleteComments = async (cid) => {
  const res = await commentInterface.delete('/comments', {params:{ cid: cid}});
  return res.data;
};