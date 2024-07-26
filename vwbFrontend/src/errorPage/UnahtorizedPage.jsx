import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function UnauthorizedPage() {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies(['authorized', 'authToken', 'name', 'id', 'password']);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/'); 
        }, 5000); 
        setCookies('authorized', false, {path: '/', maxAge: 60*60, sameSite: 'none', });
        removeCookies('authToken', {path: '/', sameSite: 'none', });
        removeCookies('name', {path: '/', sameSite: 'none', });
        removeCookies('password', {path: '/', sameSite: 'none', });
        removeCookies('id', {path: '/', sameSite: 'none', });
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box sx={{ m: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                Error Found in Your Login Info. 
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                All Login Cookies will be cleared.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Please Try Again.
            </Typography>
            <Typography variant="body2">
                You will be redirected to the homepage in 5 seconds...
            </Typography>
        </Box>
    );
}
