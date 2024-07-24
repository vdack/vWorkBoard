import { useState } from "react";
import { Popup } from "./Popup.jsx";
import { Dialog, ListItemButton, ListItemIcon, ListItemText
    ,Box,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField, Paper, IconButton
 } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
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
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    return (
        <Paper >
            <IconButton  onClick = {()=>{setOpen(true);}}>
                <ListItemIcon><AddIcon color="info"/></ListItemIcon>
            </IconButton>
            <Dialog open={open} onClose={()=>{setOpen(false);}}>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your INfo
                    </DialogContentText>
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
            </Dialog>
        </Paper>
        
    );
    
}