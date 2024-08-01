import axios from "axios";

export const apiInterface = axios.create(
    {
        baseURL: 'http://localhost:7001/api',
        timeout: 10000, 
        withCredentials: true,
    }
);
export const userInterface = axios.create(
    {
        baseURL: 'http://localhost:7001/user',
        timeout: 10000
    }
);
export const projectInterface = axios.create(
    {
        baseURL: 'http://localhost:7001/project',
        timeout: 10000,
        withCredentials: true,
    }
);
export const subProjectInterface = axios.create(
    {
        baseURL: 'http://localhost:7001/subproject',
        timeout: 10000,
        withCredentials: true,
    }
);
export const taskInterface = axios.create(
    {
        baseURL: 'http://localhost:7001/task',
        timeout: 10000,
        withCredentials: true,
    }
);
export const commentInterface = axios.create(
    {
        baseURL: 'http://localhost:7001/comment',
        timeout: 10000,
        withCredentials: true,
    }
);
export const mock_projectInterface = axios.create(
    {
        baseURL: 'http://localhost:5173/project', 
        timeout: 10000
    }
);
export const fileInterface = axios.create(
    {
        baseURL: 'http://localhost:7001/file',
        timeout: 10000,
        withCredentials: true,
    }
);