import { Typography, Box, Button, Divider } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

export function HomeBoard() {
    const navigate = useNavigate();

    const [cookies, setCookies, removeCookies] = useCookies(['authorized', 'authToken', 'name', 'id', 'password']);
    const logout = () => {
        setCookies('authorized', false, {path: '/', maxAge: 60*60, sameSite: 'none', });
        removeCookies('authToken', {path: '/', sameSite: 'none', });
        removeCookies('name', {path: '/', sameSite: 'none', });
        removeCookies('password', {path: '/', sameSite: 'none', });
        removeCookies('id', {path: '/', sameSite: 'none', });
    }
    const MainBoard = () => {
      const authorized = cookies.authorized;
      const name = cookies.name;
      if (authorized && name === undefined) {
        window.location.reload();
      }
      if (authorized) {
        return (
        <Box sx={{my:4, textAlign: "center",}}>
          <Typography variant="caption" fontSize={20} component="div" > Hello, {name} ! </Typography>
          <Box display={"flex"}>
            <Button variant="contained" sx={{minWidth:160, ml:2, mr:2}}
              onClick={() => {cookies.authorized? navigate('/board'): navigate('/');}}>
              WorkBoard
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Button variant="contained" sx={{minWidth:160, ml:2, mr:2}} onClick={logout}> Log Out </Button>
          </Box>
        </Box>
      );
      } else {
        return (
          <Box sx={{my:4, textAlign: "center"}}>
            <Typography variant="caption" fontSize={20} component="div" >
              Haven't logged yet.
            </Typography>
            <Typography variant="caption" fontSize={20}  component="div" gutterBottom>
              Click Button Below to Login or Register.
            </Typography>
            <PanToolAltIcon sx={{transform:'rotate(180deg)', fontSize:30, }} />
          </Box>
      );
      }
    };
    return (
        <div className="HomeBoard-container">
            <MainBoard />
        </div>
    );
};