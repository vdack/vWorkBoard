import { Box, Fab } from "@mui/material";
import ProjectCard from "./ProjectCard.jsx";
import AddIcon from '@mui/icons-material/Add'; 
import { getSubProject } from "../../api/mock_projectApi.jsx";
// import { getSubProjects } from "../../api/projectApi.jsx";
import { useEffect, useState } from "react";
/**
 * 
 * @param {Object} props
 * @param {number} props.pid 
 * @returns 
 */
export function ProjectBoard(props) {
  const [subProjects, setSubProjects] = useState([]);
  
  const fetchSubProject = async () => {
    try {
      const res = await getSubProject(props.pid);
      console.log('get Sub Project: ', res);
      setSubProjects(res);
    } catch (err) {
      console.log('Error for', err);
    }
  };

  const displayCards = () => {
    return (
      subProjects.map((pjct) => {return<Box key={pjct.spid}> <ProjectCard project={pjct} /> </Box>; })
    );
  }
  
  useEffect(() => {
    fetchSubProject();
  },[props.pid]);
    
  return (
    <Box sx={{mt: 20, ml: 30, display:'flex', flexDirection: 'row',flexWrap: 'wrap', gap: 2,}}>
      {/* <ProjectCard /> */}
      {/* <Box>
        <ProjectCard />
      </Box>
      <Box>
        <ProjectCard />
      </Box>
      <Box>
        <ProjectCard />
      </Box>
      <Box>
        <ProjectCard />
      </Box> */}
      {displayCards()}
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