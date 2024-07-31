// all the button with a popup here. 

import { useState, Fragment } from "react";
import { Dialog, ListItemButton, ListItemIcon, ListItemText
    ,Box,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField, Paper, IconButton,
    DialogActions, Button, Fab,
    Typography,Menu
 } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useCookies } from "react-cookie";
import { createProject, projectAddUser } from "../../api/projectApi.jsx";
import { createSubProjects } from "../../api/subProjectApi.jsx";
import AddCardIcon from '@mui/icons-material/AddCard';
import { createTask } from "../../api/taskApi.jsx";
// import { useNavigate } from "react-router-dom";

/**
 * 
 * @param {Object} props
 * @param {function} props.update
 * @returns 
 */
export const ProjectAdder = (props) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [cookie] = useCookies(['id']);
  const handleInputChange = (event) => {
      setInputValue(event.target.value);
  };
  
  const handleSubmit = async () => {
    const id = cookie['id'];
    const name = inputValue;
    const res = await createProject({uid: id, pname: name});
    console.log('create a new project:', res);
    setInputValue('');
    setOpen(false);
    props.update();
  };

  return (
    <Fragment>
      <IconButton  onClick = {()=>{setOpen(true);}}>
        <AddIcon color="info"/>
      </IconButton>
      <Dialog open={open} onClose={()=>{setOpen(false);}}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter New Project Name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpen(false);setInputValue('');}}> Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  ); 
};

/**
 * 
 * @param {Object} props
 * @param {function} props.update
 * @param {number} props.pid
 * @returns 
 */
export const UserAdder = (props) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
      setInputValue(event.target.value);
  };
  
  const handleSubmit = async () => {
    const name = inputValue;
    const res = await projectAddUser(name, props.pid);
    console.log('add a new user:', res);
    setInputValue('');
    setOpen(false);
    props.update();
  };

  return (
    <Fragment>
      <IconButton  onClick = {()=>{setOpen(true);}}>
        <AddIcon color="info"/>
      </IconButton>
      <Dialog open={open} onClose={()=>{setOpen(false);}}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter User's Name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="text"
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpen(false);setInputValue('');}}> Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  ); 
}

/**
 * 
 * @param {Object} props 
 * @param {number} props.pid
 * @param {function} props.update
 * @returns 
 */
export const SubProjectAdder = (props) => {
  const pid = props.pid;
  const update = props.update;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('New Name');
  const [discription, setDiscription] = useState('Discriptions Here.');
  
  const handleClose = (event) => {
    setOpen(false);
    setName('New Name');
    setDiscription('Discriptions Here.');
  };

  const handleSubmit = async () => {
    const res = await createSubProjects(pid, name, discription);
    update();
    console.log('submit create sub project:', res);
    handleClose();
  };
  const hanldeNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDisChange = (event) => {
    setDiscription(event.target.value);
  };

  return(
    <Fragment>
    <Fab color="secondary"
      sx={{
          position: 'absolute',
          bottom: (theme) => theme.spacing(5),
          right: (theme) => theme.spacing(3),
      }}
      onClick={() => {setOpen(true);}}
      >
      <AddIcon /> 
    </Fab>
    <Dialog open={open} onClose={()=>{setOpen(false);}} fullWidth>
        <DialogTitle>Add New SubProject</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter SubProject's Name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="subProject Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={hanldeNameChange}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Enter Discriptions
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="dsicription"
            label="discription"
            type="text"
            fullWidth
            variant="standard"
            value={discription}
            onChange={handleDisChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

/**
 * 
 * @param {Object} props
 * @param {number} props.spid 
 * @param {function} props.update 
 * @returns 
 */
export const TaskAdder = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [content, setContent] = useState('');
  const [header, setHeader] = useState('');

  const {spid, update} = props;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleContentChange = (event) => {
    // event.preventDefault();
    setContent(event.target.value);
  };
  const handleHeaderChange = (event) => {
    // event.preventDefault();
    setHeader(event.target.value);
  };
  const handleSubmit = async () => {
    const res = await createTask(spid, header, content);
    console.log('create task and get:', res);
    handleCancel();
    update();
  };
  const handleCancel = () => {
    handleClose();
    setContent('');
    setHeader('');
  }

  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <AddCardIcon />
      </IconButton>
      <Menu
        variant="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}

      >
        <Box m={2} width={250}>
          <Typography >Task Information Below:</Typography>
          <Box mb={1}>
            <TextField
              fullWidth
              margin='normal'
              label="Header"
              variant='filled'
              value={header}
              onChange={handleHeaderChange}
            />
          </Box>
          <Box mb={0.5}>
            <TextField
              fullWidth
              margin='normal'
              label="Context"
              variant='filled'
              value={content}
              onChange={handleContentChange}
              multiline
              rows={4}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleCancel} color="primary"> Cancel </Button>
            <Button onClick={handleSubmit}  color="primary"> Submit </Button>
          </Box>
        </Box>
      </Menu>
    </Fragment>
  );
};