import { SideBar } from "../components/workboard/SideBar";
import { Box, CssBaseline } from "@mui/material";
import  Dashboard  from "../components/workboard/DashBoard.jsx";
import TopBar from "../components/workboard/TopBar.jsx";
import { grey } from "@mui/material/colors";
import { ProjectBoard } from "../components/workboard/ProjectBoard.jsx";
import { useState } from "react";
import { useCookies } from "react-cookie";
/**
 * @param {Object} props
 * @param {number} props.pid 
 * @returns 
 */
export function BoardPage(props) {
    const [cookies, setCookies, removeCookies] = useCookies(['authorized', 'authToken', 'name', 'id', 'password']);

    const [pid, setPid] = useState(undefined);

    const uid = cookies['id'];
    console.log('board current user id: ', uid);

    return (
            <Box display={"flex"}  sx={{ml:0, backgroundColor: 'rgb(213, 228, 241)',
                 minHeight:'100vh',height: '100%', minWidth:'100vw', width:'100%'}}>
            <TopBar />
            <SideBar setPid={setPid}/>
            {/* <Dashboard /> */}
            <CssBaseline />
            <ProjectBoard pid={pid}/>
            
            </Box>

        
    );
}