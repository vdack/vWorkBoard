import { SideBar } from "../components/workboard/SideBar";
import { Box, CssBaseline } from "@mui/material";
import  Dashboard  from "../components/workboard/DashBoard.jsx";
import TopBar from "../components/workboard/TopBar.jsx";
import { grey } from "@mui/material/colors";
import { ProjectBoard } from "../components/workboard/ProjectBoard.jsx";
/**
 * @param {Object} props
 * @param {number} props.pid 
 * @returns 
 */
export function BoardPage(props) {
    return (
        <Box display={"flex"}  sx={{backgroundColor: 'rgb(213, 228, 241)', height: '100vh'}}>
            <TopBar />
            <SideBar />
            {/* <Dashboard /> */}
            <CssBaseline />
            <ProjectBoard />
            
        </Box>
    );
}