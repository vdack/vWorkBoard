import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {BasicMenuTrigger, SingleItem} from '../common/menu.jsx';
import { List, ListItem, ListItemText, Box } from '@mui/material';
import { TaskList } from './TaskList.jsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getTasks } from '../../api/taskApi.jsx';
import { TaskAdder } from '../common/PopupTrigger.jsx';
import { SubProjectEditPopup } from '../common/Popup.jsx';
import { deleteSubProjects } from '../../api/subProjectApi.jsx';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
/**
 * 
 * @param {Object} props 
 * @param {Object} props.project
 * @param {function} props.update
 * @returns 
 */
export default function ProjectCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [editPopupOpen, setEPOpen] = React.useState(false);
  const project = props.project;

  const handlePopupClose = () => {
    setEPOpen(false);
  }
  const pupopUpdate = async () =>{
    const promiseProject = props.update();
    const promiseTask = fetchTasks();
    await Promise.all([promiseProject, promiseTask]);
  }
  
  const fetchTasks = async () => {
    const findres = await getTasks(project.spid);
    setTasks(findres.data);
  };

  const handleExpandClick = async() => {
    await fetchTasks();
    setExpanded(!expanded);
  };

  const EditItem = (props) => {
    return <SingleItem icon={EditIcon} text='Edit' onClick={() => {setEPOpen(true); props.onClick();}} />
  };

  const handleDelete = async () => {
    const res = await deleteSubProjects(project.spid);
    console.log('delete subProject: ', res);
    props.update();
  };
  const DeleteItem = (props) => {
    return <SingleItem icon={DeleteIcon} text='Delete' onClick={() => {handleDelete(); props.onClick();}} />
  };

  return (
    <Card sx={{ width: 345 , backgroundColor: 'grey.50'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {project.name[0]}
          </Avatar>
        }
        action={
          <Box>
            <BasicMenuTrigger displayIcon={MoreVertIcon} itemList={[EditItem, DeleteItem]}/>
            <SubProjectEditPopup 
            spid={project.spid} 
            name={project.name} 
            discription={project.discription}
            open={editPopupOpen}
            handleClose={handlePopupClose}
            update={pupopUpdate}/>
          </Box> 
        }
        title={project.name}
        subheader={project.last_modified_date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {project.discription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <TaskAdder spid={project.spid} update={fetchTasks}/>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit >
        <CardContent >
          
          <TaskList tasks={tasks}/>

        </CardContent>
      </Collapse>
    </Card>
  );
};
