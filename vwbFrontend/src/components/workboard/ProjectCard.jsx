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
import { List, ListItem, ListItemText } from '@mui/material';
import { TaskList } from './TaskList.jsx';
import { AddCard } from '@mui/icons-material';
import { getTasks } from '../../api/taskApi.jsx';
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
 * @returns 
 */
export default function ProjectCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  

  const project = props.project;
  const handleExpandClick = async() => {
    const findres = await getTasks(project.spid);
    console.log('by spid: ', project.spid, 'find tasks: ', findres);
    setTasks(findres.data);
    setExpanded(!expanded);
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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
        <IconButton>
          <AddCard/>
        </IconButton>
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
