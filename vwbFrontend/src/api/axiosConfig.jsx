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
export const mock_projectInterface = axios.create(
    {
        baseURL: 'http://localhost:5173/project', 
        timeout: 10000
    }
);