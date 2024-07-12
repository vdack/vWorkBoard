import './SideBar.css';
import { Link } from 'react-router-dom';
import { getUserByProject, getProjectByUser } from '../../api/projectApi';
import { useEffect, useState } from 'react';
import { Lister } from './Lister.jsx';
import { useCookies } from 'react-cookie';
import { PopupTrigger } from '../common/PopupTrigger.jsx';
export function SideBar() {
    const[users, setUsers] = useState([]);
    const[currentProject, setCurrentProject] = useState({selected: false});
    const[projects, setProjects] = useState([]);
    const[cookies, setCookies] = useCookies([])

    const fetchProjects = async() => {
        const res = await getProjectByUser(cookies.id);
        setProjects(res.projects);
    }
    const fetchUsers = async() => {
        if (!currentProject.selected) {
            return;
        }
        const res = await getUserByProject(currentProject.id);
        setUsers(res.users);
    }

    const changeProject = async (id) => {
        console.log('current id:', id);
        console.log('current projects:', projects);
        const find = projects.find(p => p.id === id);
        
        const res = await getUserByProject(id);
        setCurrentProject({selected: true, id: find.id, name: find.name});
        setUsers(res.users);
        console.log('current users:', users);
    };

    const createProjectItem = (item) => {
        return (
            <div className='SideBar-item'>
                <button className='SideBar-subHeader' onClick={() => {changeProject(item.id);}}>
                    {item.name}
                </button>
            </div>
        );
    }

    const createItem = (item) => {
        return (
            <div className='SideBar-item'>
                <span className='SideBar-subHeader'>
                    {item.name}
                </span>
            </div>
        );
    };

    useEffect(() => {
        fetchProjects();
        fetchUsers();

    }, []);
    
    return (
        <div className="SideBar-container">
            <h2>Menu</h2>
            <div className='Sidebar-list'>
                <Lister name='Projects' itemList={projects} mapFunction={createProjectItem} />
                <PopupTrigger className='Sidebar-adder' />
                <Lister name={currentProject.name} itemList={users} mapFunction={createItem} />
            </div>
            
        </div>
    );
};