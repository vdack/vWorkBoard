import * as React from 'react';
import {Checkbox, Paper, Divider, Box, List, ListItem, ListItemText, Typography, 
  styled, ListItemIcon, ListItemButton, IconButton, 
  Collapse} from "@mui/material";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MessageIcon from '@mui/icons-material/Message';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CommentSheet } from '../common/CommentSheet';
import { getComments } from '../../api/commentApi';
import { deleteTask, editTask } from '../../api/taskApi';
import { FilePupop, TaskEditPopup } from '../common/Popup';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 * 
 * @param {Object} props
 * @param {Object} props.task
 * @param {string} props.task.header 
 * @param {string} props.task.content
 * @param {Date} props.task.date
 * @param {boolean} props.task.finished
 * @param {[]} props.task.comments
 * @returns 
 */
export function SingleTask(props) {
  const task = props.task;
  const update = props.update;
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [openPop, setOpenPop] = React.useState(false);
  const [openFile, setOpenFile] = React.useState(false);

  const fetchComments = async () => {
    const res = await getComments(task.tid);
    console.log('by tid: ', task.tid, 'get comments: ', res);
    setComments(res.data);
  }
  const handleExpandClick = async () => {
    await fetchComments(); 
    setExpanded(!expanded);
  };
  const handleFinish = async () => {
    const res = await editTask(task.tid, task.header, task.content, !task.finished);
    console.log('finished changed. res:', res);
    update();
  };
  const handleDel = async () => {
    const res = await deleteTask(task.tid);
    console.log('delete task:', res);
    update();
  }
  const handleEdit = () => {
    setOpenPop(true);
  }
  const handlePopClose = () => {
    console.log('close pop');
    setOpenPop(false);
  };

  const handleFile = () => {
    setOpenFile(true);
  }
  const handleFileClose = () => {
    setOpenFile(false);
  }

  return (
    <React.Fragment>
    <ListItem >
      <Paper sx={{width:300, 
        border: '2px solid transparent',
        transition: 'border-color 0.2s, background-color 0.2s',
        '&:hover':{
          backgroundColor: 'rgba(0, 0, 0, 0.08)', 
          cursor: 'pointer',
          borderColor: 'lightblue'
        }}}>
        <Box maxWidth={240} m={2} >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <ListItemText primary={task.header} />
                  <Typography variant="body2" color="textSecondary">
                      {task.date}
                  </Typography>
          </Box>
          <Divider sx={{maxWidth:90}}/>
          <Typography variant="body1">
            {task.content}
          </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'right'}}>
          <ExpandMore expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
          <Typography variant='body2' mt={1.5} mr={1}>comments</Typography>
          {/* <Divider  variant='inset' /> */}
          <IconButton onClick={handleFile}><InsertDriveFileIcon/></IconButton>
          <IconButton onClick={handleDel}><DeleteIcon/></IconButton>
          <IconButton onClick={handleEdit}><EditIcon/></IconButton>
          <Checkbox checked={task.finished} onChange={handleFinish}/>
        </Box>
        <FilePupop open={openFile} handleClose={handleFileClose} />
        <TaskEditPopup task={task} open={openPop} handleClose={handlePopClose} update={update} />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
          <CommentSheet comments={comments} tid={task.tid} update={fetchComments}/>
        </Collapse>
      </Paper>
    </ListItem>
    <Divider component='li' sx={{height:2, }}/>
    </React.Fragment>
  );
}