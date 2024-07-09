import apiInterface from "./axiosConfig";

export const getUserByName = async (userName) => {
    const response = await apiInterface.get('/user_name', {params:{name: userName}});
    return response.data;
} ;