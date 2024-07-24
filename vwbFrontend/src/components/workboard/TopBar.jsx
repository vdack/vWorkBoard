import { AppBar, Toolbar, Button, Box, IconButton, Typography, Fab} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


export default function TopBar() {
    return (
        <AppBar color="info" sx={{marginLeft:25}}>
            <Toolbar sx={{ml:38}}>
                <IconButton
                    edge='start'
                    aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color='inherit' component='div'>
                    Top Bar
                </Typography>
            </Toolbar>
            
        </AppBar>
    );
}