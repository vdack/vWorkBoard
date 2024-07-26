import { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/'); 
        }, 5000); 
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box sx={{ m: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                404 Not Found
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Please check the URL.
            </Typography>
            <Typography variant="body2">
                You will be redirected to the homepage in 5 seconds...
            </Typography>
        </Box>
    );
}
