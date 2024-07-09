import axios from "axios";

const apiInterface = axios.create(
    {
        baseURL: 'http://localhost:7001/api',
        timeout: 10000
    }
);

export default apiInterface;