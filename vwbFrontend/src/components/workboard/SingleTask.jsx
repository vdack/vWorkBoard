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
import { getComments } from '../../api/projectApi';
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

  const [expanded, setExpanded] = React.useState(false);
  const [finished, setFinished] = React.useState(task.finished);
  const [comments, setComments] = React.useState([]);
  const handleExpandClick = async () => {
    const res = await getComments(task.tid);
    console.log('by tid: ', task.tid, 'get comments: ', res);
    setComments(res.data);
    setExpanded(!expanded);
  };
  const handleFinish = () => {
    setFinished(!finished);
    console.log('finished changed.');

    // TODO --------------------------------
    // TODO |POST THE STATUS TO THE SERVER.|
    // TODO --------------------------------

  };

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
        <Box m={2} >
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
          <IconButton sx={{mr: 4,}}><MessageIcon /></IconButton>
          <IconButton><InsertDriveFileIcon/></IconButton>
          <IconButton><DeleteIcon/></IconButton>
          <IconButton><EditIcon/></IconButton>
          <Checkbox checked={finished} onChange={handleFinish}/>
        </Box>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
          <CommentSheet comments={comments}/>
        </Collapse>
      </Paper>
    </ListItem>
    <Divider component='li' sx={{height:2, }}/>
    </React.Fragment>
  );
}