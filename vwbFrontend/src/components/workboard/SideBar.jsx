import { useNavigate } from 'react-router-dom';
import { deleteProject, getProjects, getUsers, quitProject, renameProject } from '../../api/projectApi.jsx';
import { useEffect, useState } from 'react';
import { Lister } from '../common/Lister.jsx';
import { useCookies } from 'react-cookie';
import { ProjectAdder } from '../common/PopupTrigger.jsx';
import { Drawer, Divider, Toolbar, ListItemButton, ListItemText, List, ListSubheader, ListItemIcon,
  Typography, ListItem, Box,IconButton,
  MenuItem} from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { BasicMenuTrigger, SingleItem} from '../common/menu.jsx';
import { Popup } from '../common/Popup.jsx';
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

  const [showPopup, setShowPopup] = useState(false);
  // const [inputValue, setInputValue] = useState('');

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
    const res = await getUsers(id);
    setCurrentProject({selected: true, id: find.id, name: find.name});
    setUsers(res.data);
    console.log('current users:', users);
    props.setPid(id);
  };


  const pjctAdder = () => {
    return (<ProjectAdder fetchProjects={fetchProjects} />);
  }

  const createProjectItem = (item) => {
    

    const handleClosePopup = () => {
      setShowPopup(false);
    };

    const handleSubmit = async (new_name) => {
      const res = await renameProject(item.pid, new_name);
      console.log('handleSubmit rename: ', res);
      await fetchProjects();
      setShowPopup(false);
    };
    
    const RenameItem = (props) => {
      return (<>
      <SingleItem icon={EditIcon} text='Rename' onClick={()=>{setShowPopup(true);}}/>
      <Popup
            open={showPopup} 
            handleClose={handleClosePopup} 
            name={item.name}
            handleSubmit={handleSubmit}
            />
      </> );
    };
    const DeleteItem = (props) => {
      return (<SingleItem icon={DeleteIcon} text='Delete' onClick={async ()=>{await deleteProject(item.pid);fetchProjects();}}/>);
    };
    const QuitItem = (props) => {
      return (<SingleItem icon={ExitToAppIcon} text='Quit' onClick={async ()=>{await quitProject(cookies.id, item.pid); fetchProjects();}}/>);
    };
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={item.pid}>
        <ListItemButton  onClick={async() => {await changeProject(item.pid);}} >
          <ListItemIcon> <SpaceDashboardIcon /> </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
        <Box>
          
        </Box>
        <BasicMenuTrigger displayIcon={MoreVertIcon} itemList={[RenameItem, DeleteItem, QuitItem]} />
      </Box>
    );
  }
  

  const createItem = (item) => {
    return (
      <ListItem key={item.uid}>
        <ListItemIcon> <PersonIcon /> </ListItemIcon>
        <ListItemText primary={item.name} />
        <IconButton> <MoreVertIcon /> </IconButton>
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
        <Lister name='Projects' itemList={projects} mapFunction={createProjectItem} adder={pjctAdder}/>
        <Divider />
        {currentProject.selected? 
          <Lister name={currentProject.name} itemList={users} mapFunction={createItem} adder={ProjectAdder}/>
          : <ListItem><ListItemText primary='No Choosen Project' /></ListItem>
        }
      </Box>
    </Drawer>
  );
};