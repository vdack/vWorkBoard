import { mock_projectInterface } from "./axiosConfig";

export const getUserByProject = async(pid) => {
    const res = await mock_projectInterface.get('/getUserByProject');
    return res.data;
};
export const getProjectByUser = async(uid) => {
    const res = await mock_projectInterface.get('/getProjectByUser');
    return res.data;
}
export const getSubProject = async(pid) => {
    const res = await mock_projectInterface.get('/project/subproject');
    return res.data;
}