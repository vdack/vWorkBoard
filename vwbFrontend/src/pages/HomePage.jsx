import reactLogo from "../assets/react.svg";
import { ButtomBar } from "../components/ButtomBar";
import { HomeBoard } from "../components/HomeBoard";
import { createTheme, ThemeProvider, Box, Avatar, Typography } from "@mui/material";
export function HomePage() {
    
    const defaultTheme = createTheme();

    // return (
    //     <div>
    //         <div>
    //             <section>
    //                 <div className="logoContainer">
    //                     <img src={reactLogo} className="logo"/>
    //                 </div>
    //                 <h1>Welcome to WorkBoard!</h1>
    //             </section>
    //             <section>
    //                 <HomeBoard />
    //             </section>
    //         </div>
            
    //         <ButtomBar location='home'/>
    //     </div>
    // );
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{
                    marginTop: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',}}>    
                
                <Avatar src={reactLogo} sx={{ m: 1,p: 0.2 }}></Avatar>
                <Typography variant="h2" gutterBottom>Welcome to WorkBoard!</Typography>
                <HomeBoard />
                <ButtomBar location="home" />
            </Box>
        </ThemeProvider>
    );
}