import { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemButton, ListItemText, ListSubheader, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

/**
 * a foldable list
 * @param {Object} props
 * @param {string} props.name 
 * @param {list} props.itemList 
 * @param {function} props.mapFunction
 * @returns - a lister
 */
export const Lister = (props) => {

    const [isFolded, setFolded] = useState(true);

    const changeList = () => {
        setFolded(!isFolded);
    }
    const showItem = (item) => {
        return (
            <>
                {props.mapFunction(item)}
            </>
        );
    }
    console.log(props.name, 'current items:', props.itemList);
    return (
        <List sx={{minWidth:200}}>
            <ListItemButton onClick={changeList}>
                <ListItemText primary={props.name} />
                {isFolded? <ExpandMore color='info'/> : <ExpandLess color='success'/>}
            </ListItemButton>
            <Collapse in={!isFolded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {/* <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                </ListItemButton> */}
                {!isFolded && props.itemList.map(showItem)}
                </List>
            </Collapse>

            
        </List>
    );
};