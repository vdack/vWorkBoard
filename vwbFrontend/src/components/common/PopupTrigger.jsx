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
    Button, 
 } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useCookies } from "react-cookie";
import { createProject } from "../../api/projectApi.jsx";
// import { useNavigate } from "react-router-dom";
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

/**
 * 
 * @param {Object} props
 * @param {function} props.fetchProjects 
 * @returns 
 */
export const ProjectAdder = (props) => {
    // TODO finished this adder
    // const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [cookie] = useCookies(['id']);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    
    const handleSubmit = async () => {
      const id = cookie['id'];
      const name = inputValue;
      const res = await createProject({uid: id, pname: name});
      console.log('create a new project:', res);
      setInputValue('');
      setOpen(false);
      props.fetchProjects();
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
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
        
    );
    
}