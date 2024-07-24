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
 * @param {string} name 
 * @param {string} content
 * @returns 
 */
export function SingleTask(props) {

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = ()=> {
    setExpanded(!expanded);
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
        <Box m={2} >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <ListItemText primary='header' />
                  <Typography variant="body2" color="textSecondary">
                      [Date]
                  </Typography>
          </Box>
          <Divider sx={{maxWidth:90}}/>
          <Typography variant="body1">
            {props.content}
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
          <Checkbox/>
        </Box>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
          <CommentSheet />
        </Collapse>
      </Paper>
    </ListItem>
    <Divider component='li' sx={{height:2, }}/>
    </React.Fragment>
  );
}