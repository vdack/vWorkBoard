
import { Link, useNavigate } from 'react-router-dom';
import { getProjects, getUsers } from '../../api/projectApi.jsx';
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
  const[currentProject, setCurrentProject] = useState({selected: false, id: -1, name:''});
  const[projects, setProjects] = useState([]);
  const[cookies, setCookies] = useCookies([]);

  const fetchProjects = async() => {
    try {
      const res = await getProjects(cookies.id);
      console.log('fetch projects and get:', res);
      setProjects(res.data);
    } catch(err) {
      console.log('Error when fetch projects:',err);
    //   navigate('/unauthorized');
    }
    
  }
    const changeProject = async (id) => {
        const find = projects.find(p => p.pid === id);
        // const [toAddProject, setToAddProject] = useState(false);
        // const [toAddUser, setToAddUser] = useState(false);

        const res = await getUsers(id);
        setCurrentProject({selected: true, id: find.id, name: find.name});
        setUsers(res.data);
        console.log('current users:', users);
        props.setPid(id);
    };

    const createProjectItem = (item) => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={item.pid}>
                <ListItemButton  onClick={async() => {await changeProject(item.pid);}} >
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
            <ListItem key={item.uid}>
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
  }, []);

    return (
        <Drawer variant='permanent' open={true} 
            sx={{position: 'static',} }>
            <Box m={1.5}>
                <Lister name='Projects' itemList={projects} mapFunction={createProjectItem} adder={ProjectAdder}/>
                <Divider />
                {currentProject.selected? 
                    <Lister name={currentProject.name} itemList={users} mapFunction={createItem} adder={ProjectAdder}/>
                    : <ListItem><ListItemText primary='No Choosen Project' /></ListItem>
                }
            </Box>
        </Drawer>
    );
};