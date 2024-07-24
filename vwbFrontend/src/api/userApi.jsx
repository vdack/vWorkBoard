import {userInterface} from "./axiosConfig";

export const getUserByName = async (userName) => {
    const response = await userInterface.get('/user_name', {params:{name: userName}});
    return response.data;
} ;

export const register = async (user) => {
    const data = {name: user.name, password: user.password};
    console.log('data: ', data);
    const response = await userInterface.post('/register', data);
    return response.data;
};

export const login = async (user) => {
    const data = {name: user.name, password: user.password};
    console.log('data: ', data);
    const response = await userInterface.post('/login', data);
    return response.data;
};

export const getToken = async (user) => {
    const data = {name: user.name, password: user.password};
    console.log('get Token with Data: ', data);
    const response = await userInterface.post('/getToken', data);
    return response.data;
}