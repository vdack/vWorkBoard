
import {ButtomBar} from "../components/ButtomBar.jsx";
import { createTheme, ThemeProvider, Box, CssBaseline, 
    Typography, Container, Divider, Link
 } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
export function AboutPage() {
    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box>
                <CssBaseline />
                <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                    <Typography variant="h3" component="h1" gutterBottom>
                        About The Web:
                    </Typography>
                    <Box sx={{ml:4}}>
                        <Typography variant="body1" fontSize={20}>Project for Web Development, NJU.</Typography>
                        <Typography variant="body1" fontSize={20} gutterBottom> A Very Simple WorkBoard Web Application. </Typography>
                        <Link href="https://github.com/vdack/vWorkBoard" target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center',  }}>
                            <GitHubIcon sx={{ mr: 1 , color: 'black'}} />
                            Project Source
                        </Link>
                    </Box>
                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h3" component="h1" gutterBottom>
                        About The Me:
                    </Typography>
                    <Box sx={{ml:4}}>
                        <Typography variant="body1" fontSize={20}>A SE Undergraduate in NJU</Typography>
                        <Typography variant="body1" fontSize={20} gutterBottom>221900009 Chen P.X.</Typography>
                        <Link href="https://github.com/vdack" gutterBottom target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center',  }}>
                            <GitHubIcon sx={{ mr: 1 , color: 'black'}} />
                            My GitHub
                        </Link>
                        <Link href="mailto:thousandawn@126.com" gutterBottom target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center',  }}>
                            <EmailIcon sx={{ mr: 1 , color: 'black'}} />
                            My Email
                        </Link>
                        <Typography variant="body1" fontSize={25} gutterBottom>For More Information, Please Contact Me.</Typography>
                    </Box>
                    <Divider sx={{ my: 4 }} />
                </Container>
                <ButtomBar location='about'/>
            </Box>
        </ThemeProvider>
    );
};