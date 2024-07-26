import * as React from 'react';
import {Checkbox, Paper, Divider, Box, List, ListItem, ListItemText, Typography, ListItemIcon, ListItemButton, IconButton } from "@mui/material";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { SingleTask } from './SingleTask.jsx';

/**
 * 
 * @param {Object} props
 * @param {[]} props.tasks 
 * @returns 
 */
export function TaskList(props) {
  // console.log('task list get tasks:', props.tasks);
  const displayTask = () => {
    return props.tasks.map((task) => {return <Box key={task.tid}><SingleTask task={task} /></Box>});
  }

    return (
        <List subheader={
            <Box display='flex' sx={{alignItems:'center'}}>
                <ListItemIcon >
                    <AssignmentOutlinedIcon />
                    <Typography variant='subtitle1'>Task:</Typography>
                    
                </ListItemIcon>
            </Box>
            }>

            <Divider sx={{borderBottomWidth:2}}/>
            {/* <Box>
            <SingleTask content='TASK CONTENT.' />
            </Box>  
            
            <SingleTask content='ANOTHER TASK.' />
            <SingleTask content='MORE CONTNENT HERE FOR DISPLAY.' /> */}
          {displayTask()}
        </List>
    );
}