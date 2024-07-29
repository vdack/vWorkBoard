import { Box, Fab } from "@mui/material";
import ProjectCard from "./ProjectCard.jsx";
import { getSubProjects } from "../../api/subProjectApi.jsx"
import { useEffect, useState } from "react";
import { SubProjectAdder } from "../common/PopupTrigger.jsx";
/**
 * 
 * @param {Object} props
 * @param {number} props.pid 
 * @returns 
 */
export function ProjectBoard(props) {
  const [subProjects, setSubProjects] = useState([]);
  
  const fetchSubProject = async () => {
    console.log('try to fetch subProjects. with pid: ', props.pid);
    if (props.pid === undefined) {
      return ;
    }
    try {
      const res = await getSubProjects(props.pid);
      console.log('get Sub Project: ', res);
      setSubProjects(res.data);
    } catch (err) {
      console.log('Error for', err);
    }
  };

  const displayCards = () => {
    return (
      subProjects.map((pjct) => {return<Box key={pjct.spid}> <ProjectCard project={pjct} update={fetchSubProject} /> </Box>; })
    );
  }
  
  useEffect(() => {
    fetchSubProject();
  }, [props.pid]);
    
  return (
    <Box sx={{mt: 20, ml: 30, display:'flex', flexDirection: 'row',flexWrap: 'wrap', gap: 2,}}>
      {displayCards()}
      <SubProjectAdder pid={props.pid} update={fetchSubProject}/>
    </Box>
  );
}