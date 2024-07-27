import { useState } from 'react';
import { List, styled, ListItem, IconButton, 
    ListItemIcon, ListItemButton, ListItemText, ListSubheader, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
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
 * a foldable list
 * @param {Object} props
 * @param {string} props.name 
 * @param {[]} props.itemList
 * @param {function} props.adder 
 * @param {function} props.mapFunction
 * @param {} props.adder
 * @returns - a lister
 */
export const Lister = (props) => {
    const Adder = props.adder;
    const [isFolded, setFolded] = useState(true);

    const changeList = () => {
        setFolded(!isFolded);
    }
    // console.log(props.name, 'current items:', props.itemList);
    return (
        <List sx={{minWidth:200}}>
            <ListItem>
                <Adder />
                <ListItemText primary={props.name} />
                <ExpandMore
                expand={!isFolded}
                onClick={changeList}
                aria-expanded={!isFolded}
                aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </ListItem>
            <Collapse in={!isFolded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {!isFolded && props.itemList.map(props.mapFunction)}
                </List>
            </Collapse>            
        </List>
    );
};

export function ProjectLister(props) {
    return(<></>);
}

export function UserLister(props) {
    return (<></>);
}
export function TaskLister(props) {
    return (<></>);
}