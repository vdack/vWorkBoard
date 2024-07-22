import { SideBar } from "../components/workboard/SideBar";
import { Box } from "@mui/material";
import  Dashboard  from "../components/workboard/DashBoard.jsx";
export function BoardPage() {
    return (
        <Box display={"flex"} sx={{backgroundColor:'grey'}}>
            <SideBar />
            {/* <Dashboard /> */}
            <p>Hello, Borad Page!</p>
        </Box>
    );
}