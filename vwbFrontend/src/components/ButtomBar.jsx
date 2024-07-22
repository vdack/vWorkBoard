import {
    useNavigate
  } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box, createStyles, createTheme, ThemeProvider} from '@mui/material';

import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

/**
 * 
 * @param {Object} props 
 * @param {string} props.location 
 * @returns 
 */
export function ButtomBar(props) {
    
    const navigate = useNavigate();
    const [location, setLocation] = useState(props.location);
    const handleChange = (event, newValue) => {
        setLocation(newValue);
        switch(newValue) {
            case 'home': 
                navigate('/home');
                break;
            case 'login': 
                navigate('/login');
                break;
            case 'register': 
                navigate('/register');
                break;
            case 'about': 
                navigate('/about');
                break;
        }
    };

    return (
        
            <Box sx={{ display: 'flex', 
            justifyContent: 'center', 
            width: '100%', 
            position: 'fixed', 
            bottom: 0, 
            backgroundColor: 'rgb(213, 228, 241)'
            }}>
                <BottomNavigation sx={{
                    width:700, 
                    minHeight:80,
                    backgroundColor: 'rgb(213, 228, 241)', 
                    outline:true}}
                    value={location} onChange={handleChange}  >

                    <BottomNavigationAction label='Home' value='home' icon={<HomeIcon />} sx={{ border: '2px solid #e0e0e0' }}>
                        
                    </BottomNavigationAction>
                    <BottomNavigationAction label='Login' value='login' icon={<PersonIcon />} sx={{ borderRight: '2px solid #e0e0e0' }}>
                    
                    </BottomNavigationAction>
                    <BottomNavigationAction label='Register' value='register' icon={<PersonAddAlt1Icon />} sx={{ borderRight: '2px solid #e0e0e0' }}>
                    
                    </BottomNavigationAction>
                    <BottomNavigationAction label='About' value='about' icon={<InfoIcon />} sx={{ borderRight: '2px solid #e0e0e0' }}>
                    
                    </BottomNavigationAction>
                </BottomNavigation>
            </Box>
        
    );
};