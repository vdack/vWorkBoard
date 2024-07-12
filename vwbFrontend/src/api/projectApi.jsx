import { projectInterface } from "./axiosConfig";

export const getUserByProject = async(pid) => {
    const res = await projectInterface.get('/getUserByProject');
    return res.data;
};
export const getProjectByUser = async(uid) => {
    const res = await projectInterface.get('/getProjectByUser');
    return res.data;
}