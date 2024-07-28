import React, { useState } from 'react';
import { Box,Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

/**
 * 
 * @param {Object} props 
 * @param {string} props.name
 * @param {boolean} props.open
 * @param {string} props.inputValue
 * @param {function} props.handleSubmit
 * @param {function} props.handleClose
 * @param {function} props.handleInputChange
 * @returns 
 */
export function Popup(props) {
  const old_name = props.name;
  const [inputValue, setInputValue] = useState(old_name);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }
  const handleSubmit = () => {
    const new_name = inputValue;
    props.handleSubmit(new_name);
    setInputValue('');
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