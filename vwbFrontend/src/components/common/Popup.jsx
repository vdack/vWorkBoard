import React, { useState } from 'react';
import { Box,Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { editSubProject } from '../../api/subProjectApi';
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>
  );
};