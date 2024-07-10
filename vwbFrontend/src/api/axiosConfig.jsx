import axios from "axios";

export const apiInterface = axios.create(
    {
        baseURL: 'http://localhost:7001/api',
        timeout: 10000
    }
);
export const userInterface = axios.create(
    {
        baseURL: 'http://localhost:7001/user',
        timeout: 10000
    }
);
