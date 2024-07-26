
import { Link, useNavigate } from 'react-router-dom';
import { getUserByProject, getProjectByUser } from '../../api/mock_projectApi.jsx';
import { useEffect, useState } from 'react';
import { Lister } from './Lister.jsx';
import { useCookies } from 'react-cookie';
import { PopupTrigger, ProjectAdder } from '../common/PopupTrigger.jsx';
import { Popup } from '../common/Popup.jsx';
import { Drawer, Divider, Toolbar, ListItemButton, ListItemText, List, ListSubheader, ListItemIcon,
    Typography, ListItem, Box,
    IconButton} from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';

/**
 * 
 * @param {Object} props
 * @param {function} props.setPid 
 * @returns 
 */
export function SideBar(props) {
  const navigate = useNavigate();
  const[users, setUsers] = useState([]);
  const[currentProject, setCurrentProject] = useState({selected: false});
  const[projects, setProjects] = useState([]);
  const[cookies, setCookies] = useCookies([]);

  const fetchProjects = async() => {
    try {
      const res = await getProjectByUser(cookies.id);
      console.log('fetch projects and get:', res);
      setProjects(res.projects);
    } catch(err) {
      console.log('Error when fetch:',err);
      navigate('/unauthorized');
    }
    
  }
  const fetchUsers = async() => {
    try{
      if (!currentProject.selected) {
        return;
      }
      const res = await getUserByProject(currentProject.id);
      console.log('fetch users and get: ', res);
      setUsers(res.users);
    } catch(err) {
      console.log('Error when fetch:',err);
      navigate('/unauthorized');
    }
  }

    const changeProject = async (id) => {
        console.log('current id:', id);
        console.log('current projects:', projects);
        const find = projects.find(p => p.id === id);
        
        const res = await getUserByProject(id);
        setCurrentProject({selected: true, id: find.id, name: find.name});
        setUsers(res.users);
        console.log('current users:', users);
        props.setPid(id);
    };

    const createProjectItem = (item) => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={item.id}>
                <ListItemButton  onClick={() => {changeProject(item.id);}} >
                    <ListItemIcon>
                        <SpaceDashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItemButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Box>
            
        );
    }

    const createItem = (item) => {
        return (
            <ListItem key={item.id}>
                <ListItemIcon>
                        <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </ListItem>
        );
    };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

    return (
        <Drawer variant='permanent' open={true} 
            sx={{position: 'static',} }>
            <Box m={1.5}>
                <Lister name='Projects' itemList={projects} mapFunction={createProjectItem} />
                <Divider />
                {currentProject.selected? 
                    <Lister name={currentProject.name} itemList={users} mapFunction={createItem} />
                    : <ListItem><ListItemText primary='No Choosen Project' /></ListItem>
                }
            </Box>
        </Drawer>
    );
};