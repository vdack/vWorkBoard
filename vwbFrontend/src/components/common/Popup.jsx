import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

export function Popup() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log('输入的信息:', inputValue);
    handleClose();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        打开输入弹窗
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>输入信息</DialogTitle>
        <DialogContent>
          <Typography>
            ENter
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="信息"
            type="text"
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit}>提交</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};