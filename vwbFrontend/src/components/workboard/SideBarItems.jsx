import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { RenamePopup } from "../common/Popup";
import { BasicMenuTrigger, SingleItem } from "../common/menu";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { useState } from "react";
import { renameProject, deleteProject, quitProject } from "../../api/projectApi";
import { useCookies } from "react-cookie";
/**
 * 
 * @param {Object} props 
 * @param {Object} props.item
 * @param {number} props.currentPid
 * @param {function} props.changeProject
 * @param {function} props.update
 * @returns 
 */
export const SingleProjectItem = (props) => {
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(['id']);
  const item = props.item;
  const currentPid = props.currentPid;
  const changeProject = props.changeProject;
  const update = props.update;
  // console.log('item: ', item);


  
  const uid = cookies.id;
  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleSubmit = async (new_name) => {
    const res = await renameProject(item.pid, new_name);
    console.log('handleSubmit rename: ', res);
    await update();
    setOpen(false);
  };
  const handleDel = async () => {
    await deleteProject(item.pid);
    if (currentPid === item.pid) {
      changeProject(-1);  
    }
    update();
  }
  const handleQuit = async () => {
    await quitProject(uid, item.pid);
    if (currentPid === item.pid) {
      changeProject(-1);  
    }
    update();
  }
    
  const RenameItem = (props) => {
    return (<SingleItem icon={EditIcon} text='Rename' onClick={()=>{setOpen(true); props.onClick();}}/>);
  };
  const DeleteItem = (props) => {
    return (<SingleItem icon={DeleteIcon} text='Delete' onClick={async ()=>{handleDel(); props.onClick();}}/>);
  };
  const QuitItem = (props) => {
    return (<SingleItem icon={ExitToAppIcon} text='Quit' onClick={async ()=>{handleQuit();props.onClick();}}/>);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={item.pid}>
      <ListItemButton  onClick={async() => {await props.changeProject(item.pid);}} >
        <ListItemIcon> <SpaceDashboardIcon /> </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
      <Box>
      <RenamePopup
        open={open} 
        handleClose={handleClosePopup} 
        name={item.name}
        handleSubmit={handleSubmit}
      />
      </Box>
      <BasicMenuTrigger displayIcon={MoreVertIcon} itemList={[RenameItem, DeleteItem, QuitItem]} />
    </Box>
  );
};

export const SingleUserItem = (props) => {
  const [open, setOpen] = useState(false);
  const item = props.item;
  const update = props.update;
  const pid = props.pid;
  // console.log('singgle item get pid: ', pid);
  const handleClosePopup = () => {
    setOpen(false);
  };


  const RemoveItem = (props) => {
    return (<SingleItem icon={GroupRemoveIcon} text='Remove' 
      onClick={async ()=>{
      await quitProject(item.uid, pid);
      update();
      props.onClick();}}/>
    );
  };
 

  return (
    <ListItem key={item.uid}>
      <ListItemIcon> <PersonIcon /> </ListItemIcon>
      <ListItemText primary={item.name} />
      <BasicMenuTrigger displayIcon={MoreVertIcon} itemList={[RemoveItem]} />
    </ListItem>
  );
};