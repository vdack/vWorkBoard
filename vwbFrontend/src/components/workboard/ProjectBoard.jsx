import { Box, Fab } from "@mui/material";
import ProjectCard from "./ProjectCard.jsx";
import AddIcon from '@mui/icons-material/Add'; 
export function ProjectBoard() {
    return (
        <Box ml={30} mt={20}>
            <ProjectCard />
            <Fab color="secondary"
                sx={{
                    position: 'absolute',
                    
                    bottom: (theme) => theme.spacing(5),
                    right: (theme) => theme.spacing(3),
                }}
                >
                <AddIcon /> 
            </Fab>
        </Box>
    );
}