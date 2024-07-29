import * as React from 'react';
import Button from '@mui/material/Button';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

/**
 * 
 * @param {Object} props 
 * @param {} props.icon 
 * @param {string} props.text 
 * @param {function} props.onClick 
 * @returns 
 */
export const SingleItem = (props) => {
  const Icon = props.icon;
  return (
    <MenuItem onClick={() => {props.onClick();}}>
      <ListItemIcon> <Icon /> </ListItemIcon>
      <ListItemText>{props.text}</ListItemText>
    </MenuItem>
  );
};

/**
 * 
 * @param {Object} props
 * @param {} props.displayIcon 
 * @param {[]}props.itemList 
 * @returns 
 */
export function BasicMenuTrigger(props) {
  const DisplayIcon = props.displayIcon;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // console.log('menu handle close');
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      > 
        <DisplayIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {props.itemList.map((Item, index) => {return <Item key={index} onClick={handleClose}/>})}
      </Menu>
    </div>
  );
};
