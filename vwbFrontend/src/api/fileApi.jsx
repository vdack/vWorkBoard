import { fileInterface } from "./axiosConfig";

export const getFiles = async (tid) => {
  const res = await fileInterface.get('/lists', {params: {tid: tid}});
  console.log('get Files response:', res.data.data);
  return res.data.data;
};

export const delFile = async (fid) => {
  const res = await fileInterface.delete('/', {params: {fid: fid}});
  return res.data;
};

export const uploadFile = async (file, tid) => {
 const formData = new FormData();
  formData.append('file', file);
  formData.append('tid', tid);
  const res = await fileInterface.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },});
  return res.data;
};

export const downloadFile = async (fid) => {
  const res = await fileInterface.get('/', {params: {fid: fid}});
  console.log('download file and get res:', res);
  return res.data.data;
}