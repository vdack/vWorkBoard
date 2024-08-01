import React, { useState, useEffect } from 'react';
import { Box,Paper, Button, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, TextField, 
  Typography, ListItem, ListItemText, List } from '@mui/material';
import axios from 'axios';
import { editSubProject } from '../../api/subProjectApi';
import { editTask } from '../../api/taskApi';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
/**
 * 
 * @param {Object} props 
 * @param {string} props.name
 * @param {boolean} props.open
 * @param {function} props.handleSubmit
 * @param {function} props.handleClose
 * @returns 
 */
export function RenamePopup(props) {
  const old_name = props.name;
  const [inputValue, setInputValue] = useState(old_name);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }
  const handleSubmit = () => {
    const new_name = inputValue;
    props.handleSubmit(new_name);
    setInputValue(new_name);
  };
  return (
      <Dialog open={props.open} onClose={props.handleClose} >
        <DialogTitle>New Name of {old_name}</DialogTitle>
        <DialogContent>
          <DialogContentText> Enter: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="new_name"
            type="text"
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>CANCEL</Button>
          <Button onClick={handleSubmit}>SUBMIT</Button>
        </DialogActions>
      </Dialog>
  );
};

/**
 * 
 * @param {Object} props
 * @param {number} props.spid
 * @param {string} props.name 
 * @param {string} props.discription 
 * @param {boolean} props.open 
 * @param {function} props.handleClose 
 * @param {function} props.update 
 * @returns 
 */
export const SubProjectEditPopup = (props) => {
  const {name: old_name, discription: old_discription, open: open, spid: spid} = props;

  const handleClose = () => {
    props.handleClose();
    props.update();
  };
  
  const [name, setName] = useState(old_name);
  const [discription, setDiscription] = useState(old_discription);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDisChange = (event) => {
    setDiscription(event.target.value);
  }
  const handleSubmit = async () => {
    const res = await editSubProject(spid, name, discription);
    console.log('edit project submit and res:', res);
    handleClose();
  }
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Edit {old_name} </DialogTitle>
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
            onChange={handleNameChange}
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
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>
  );
};

/**
 * 
 * @param {Object} props
 * @param {Object} props.task 
 * @param {function} props.handleClose 
 * @param {boolean} props.open 
 * @param {function} props.update 
 * @returns 
 */
export const TaskEditPopup = (props) => {
  const task = props.task;
  open = props.open;
  const [content, setContent] = useState(task.content);
  const [header, setHeader] = useState(task.header);

  const handleClose = () => {
    props.handleClose();
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };
  const handleSubmit = async () => {
    const res = await editTask(task.tid, header, content, task.finished);
    console.log('edit task and get:', res);
    handleCancel();
    props.update();
  };
  const handleCancel = () => {
    props.handleClose();
    setContent(task.content);
    setHeader(task.header);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Task Information Below:</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Header"
          variant="filled"
          value={header}
          onChange={handleHeaderChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Content"
          variant="filled"
          value={content}
          onChange={handleContentChange}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {function} props.handleClose 
 * @param {function} props.update 
 * @param {number} props.tid
 * @returns 
 */
export const FilePupop = (props) => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const open = props.open;
  const tid = props.tid;

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tid', tid);
      // formData.append('name', file.name);
      try {
        const response = await axios.post('http://localhost:7001/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('File uploaded successfully', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleClose = () => {
    props.handleClose();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // await handleUpload();
  };

  const handleDownload = (fileName) => {
    //todo
  };

  const FileItem = (props) => {
    return (
      <ListItem>
        <ListItemText primary={props.text} />
        <IconButton onClick={() => handleDownload(props.text)}>
          <CloudDownloadIcon />
        </IconButton>
      </ListItem>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box m={3} width={500} minHeight={500}>
        <List>
          <ListItem>
            <ListItemText primary='ALL FILES:' />
            {/* <Button
              component="label"
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button> */}
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
          </ListItem>
          {files.map((item, index) => <FileItem key={index} text={item} />)}
        </List>
      </Box>
    </Dialog>
  );
};
