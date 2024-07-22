
import { Link } from 'react-router-dom';
import { getUserByProject, getProjectByUser } from '../../api/projectApi';
import { useEffect, useState } from 'react';
import { Lister } from './Lister.jsx';
import { useCookies } from 'react-cookie';
import { PopupTrigger } from '../common/PopupTrigger.jsx';
import { Drawer, Divider, Toolbar, ListItemButton, ListItemText, List, ListSubheader, ListItemIcon,
    Typography } from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
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
            <ListItemButton  onClick={() => {changeProject(item.id);}}>
                <ListItemIcon>
                    <SpaceDashboardIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
            </ListItemButton>
        );
    }

    const createItem = (item) => {
        return (
            <ListItemText>
                {item.name}
            </ListItemText>
        );
    };

    useEffect(() => {
        fetchProjects();
        fetchUsers();

    }, []);
    
    // return (
    //     <div className="SideBar-container">
    //         <h2>Menu</h2>
    //         <div className='Sidebar-list'>
    //             <Lister name='Projects' itemList={projects} mapFunction={createProjectItem} />
    //             <PopupTrigger className='Sidebar-adder' />
    //             <Lister name={currentProject.name} itemList={users} mapFunction={createItem} />
    //         </div>
            
    //     </div>
    // );
    return (
        <Drawer variant='permanent' open='true' sx={{position: 'relative',minWidth:300} }>
            <Typography variant='h3' align='center'>
                Lists
            </Typography>
            <Divider />

            <Lister name='Projects' itemList={projects} mapFunction={createProjectItem} />
            <Divider />
            {/* <PopupTrigger className='Sidebar-adder' /> */}
            <Lister name={currentProject.name} itemList={users} mapFunction={createItem} />
            
        </Drawer>
    );
};