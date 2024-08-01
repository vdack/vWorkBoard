import { AppBar, Toolbar, Button, Box, IconButton, Typography, Fab, Badge, Menu, MenuItem, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState , useEffect} from "react";
import { getNotifications, readNotification } from "../../api/notificationApi";
import InfoIcon from '@mui/icons-material/Info';

/**
 * 
 * @param {Object} props
 * @param {string} props.name 
 * @param {number} props.uid 
 * @returns 
 */
export default function TopBar(props) {
  const name = props.name;
  const uid = props.uid;
  const [notifications, setNotifications] = useState([]);
  const [noti_counter, setNotiCounter] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const fetchNotifications = async () => {
    const res = await getNotifications(uid);
    console.log('get notis:', res);
    setNotifications(res.notifications);
    setNotiCounter(res.counter);
  }
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [uid]); 

  const Notification = (props) => {
    const item = props.item;
    
    const handleRead = async () => {
      if (item.read) {
        return;
      }
      await readNotification(item.nid);
      console.log('read', item.action);
      fetchNotifications();
    }
    return (
      <MenuItem  onMouseEnter={handleRead}>
        <Box ml={1} mr={1} display='flex' alignItems="center" >
          <ListItemIcon >
          {!item.read && <InfoIcon />}
          </ListItemIcon>
          <Typography>
            {item.action}
          </Typography>
        </Box>
      </MenuItem>
    );
  }
  return (
    <AppBar color="info">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', ml:28 }}>
          <IconButton
            edge='start'
            aria-label="menu"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color='inherit' component='div' sx={{ ml: 2 }}>
              Top Bar
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          
          <IconButton size="large" color="inherit" onMouseEnter={handleClick} >
            <Badge badgeContent={noti_counter} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onMouseLeave={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {notifications.map((item, index) => {return <Notification item={item} key={index} />})}
          </Menu>
          <IconButton size="large" edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
          <Typography variant="body1" ml={1}>
            {name}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
