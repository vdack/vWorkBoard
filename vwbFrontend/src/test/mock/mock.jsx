import { mock_projectInterface } from "../../api/axiosConfig.jsx";
import MockAdapter from "axios-mock-adapter";
import {projects, users} from './project.jsx'
import { Cookies } from "react-cookie";
import { subprojects } from "./subproject.jsx";

const cookies = new Cookies();
const mock = new MockAdapter(mock_projectInterface);

mock.onGet('/getUserByProject').reply(200, projects.project1);
mock.onGet('/getProjectByUser').reply(config => {
    const uid = cookies.get('id');
    if (uid === 11) {
        return [401, {message: 'Unauthorized!'}];
    }
    return [200, users.user1];
});
// mock.onGet('/getProjectByUser').reply(200, users.user1);
mock.onGet('/project/subproject').reply(200, subprojects);
export default mock;