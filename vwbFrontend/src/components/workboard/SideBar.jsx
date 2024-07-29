import { useNavigate } from 'react-router-dom';
import { deleteProject, getProjects, getUsers, quitProject, renameProject } from '../../api/projectApi.jsx';
import { useEffect, useState } from 'react';
import { Lister } from '../common/Lister.jsx';
import { useCookies } from 'react-cookie';
import { ProjectAdder, UserAdder } from '../common/PopupTrigger.jsx';
import { Drawer, Divider, Toolbar, ListItemButton, ListItemText, List, ListSubheader, ListItemIcon,
  Typography, ListItem, Box,IconButton,
  MenuItem} from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { BasicMenuTrigger, SingleItem} from '../common/menu.jsx';
import { SingleProjectItem, SingleUserItem } from './SideBarItems.jsx';
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

  const fetchUsers = async (pid) => {
    const res = await getUsers(pid);
    setUsers(res.data);
  };

  const changeProject = async (id) => {
    console.log('change Project with pid: ', id);
    if (id === -1) {
      setCurrentProject({selected:false, id: -1, name: ''});
      props.setPid(-1);
      return;
    }
    const find = projects.find(p => p.pid === id);
    fetchUsers(id);
    setCurrentProject({selected: true, id: id, name: find.name});
    props.setPid(id);
  };

  const update = () => {
    fetchProjects();
    fetchUsers(currentProject.id);
  }
  const pjctAdder = () => {
    return (<ProjectAdder update={fetchProjects} />);
  }
  const createProjectItem = (item) => {
    return (
    <SingleProjectItem 
      key={item.pid} 
      item={item} 
      update={update} 
      changeProject={changeProject} 
      currentPid={currentProject.id}
    />);
  }
  
  const usrAdder = () => {
    return (<UserAdder update={update} pid={currentProject.id}/>);
  };
  const createItem = (item) => {
    console.log('user item current project: ', currentProject);
    return <SingleUserItem key={item.uid} item={item} update={update} pid={currentProject.id}/>
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Drawer variant='permanent' open={true} 
      sx={{position: 'static',} }>
      <Box m={1.5} maxWidth={200}>
        <Lister name='Projects' itemList={projects} mapFunction={createProjectItem} adder={pjctAdder}/>
        <Divider />
        {currentProject.selected? 
          <Lister name={currentProject.name} itemList={users} mapFunction={createItem} adder={usrAdder}/>
          : <ListItem><ListItemText primary='No Choosen Project' /></ListItem>
        }
      </Box>
    </Drawer>
  );
};