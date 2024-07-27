import { Fragment } from "react";
import { useState } from "react";
import { Popup } from "./Popup.jsx";
import { Dialog, ListItemButton, ListItemIcon, ListItemText
    ,Box,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField, Paper, IconButton,
    DialogActions,
    Button
 } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useCookies } from "react-cookie";
export const PopupTrigger = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleButtonClick = () => {
    setShowPopup(true);
    };

    const handleClosePopup = () => {
    setShowPopup(false);
    };

    const handleInputChange = (event) => {
    setInputValue(event.target.value);
    };

    return (
    <div>
        <button onClick={handleButtonClick}>Show</button>
        <Popup 
        show={showPopup} 
        handleClose={handleClosePopup} 
        handleChange={handleInputChange} 
        inputValue={inputValue} 
        />
    </div>
    );
};

export const ProjectAdder = () => {
    // TODO finished this adder
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [cookie] = useCookies(['id']);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    
    const handleSubmit = () => {
      const id = cookie['id'];
      const name = inputValue;
      
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
                    <Button>Submit</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
        
    );
    
}