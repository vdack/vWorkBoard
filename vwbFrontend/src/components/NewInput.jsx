import { useRef } from "react";
import reactLogo from "../assets/react.svg";
import { Button, Container, CssBaseline, TextField, Typography, FormControlLabel, 
    Checkbox, Avatar, ThemeProvider, Box,
    createTheme, 
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export function AccPswdInputer(paras) {
    const defaultTheme = createTheme();

    const accountRef = useRef(null);
    const passwordRef = useRef(null);
    const submitName = paras.submitName;
    const onSubmit = (event) => {
        event.preventDefault();
        const tempAccount = accountRef.current.value;
        const tempPassword = passwordRef.current.value;
        paras.onSubmit(tempAccount, tempPassword);
        accountRef.current.value = '';
        passwordRef.current.value = '';
        
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    
                    <Avatar src={reactLogo} sx={{ m: 1,p: 0.2 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                
                    <Typography component="h1" variant="h5">
                        {submitName}
                    </Typography>

                    <Box component="form" onSubmit={onSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                            inputRef={accountRef}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={passwordRef}
                        />
                        
                        <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            
                        >
                            {submitName}
                        </Button>
                        
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}