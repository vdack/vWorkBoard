import { projectInterface } from "../../api/axiosConfig.jsx";
import MockAdapter from "axios-mock-adapter";
import {projects, users} from './project.jsx'

const mock = new MockAdapter(projectInterface);
mock.onGet('/getUserByProject').reply(200, projects.project1);
mock.onGet('/getProjectByUser').reply(200, users.user1);

export default mock;