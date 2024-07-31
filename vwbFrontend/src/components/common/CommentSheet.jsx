import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import {CommentBox} from "./CommentBox.jsx";
import { useCookies } from "react-cookie";
import { deleteComments } from "../../api/commentApi.jsx";


/**
 * 
 * @param {Object} props
 * @param {[]} props.comments 
 * @param {number} props.tid
 * @param {function} props.update
 * @returns 
 */
export function CommentSheet(props) {
  const comments = props.comments;
  const update = props.update;
  const [cookies] = useCookies(['id']);
  const uid = cookies.id;
  /**
   * 
   * @param {Object} comment
   * @param {number} comment.cid 
   * @param {string} comment.user_name 
   * @param {string} comment.content 
   * @param {Date} comment.date
   * @returns 
   */
  const createComment = (comment) => {
    const handleDelete = async() => {
      const res = await deleteComments(comment.cid);
      console.log('delete comment cid:', comment.cid, 'res:', res);
      update();
    }; 
    return (
      <Paper key={comment.cid}>
        <Box m={1}>
          <Box display='flex'>
            <Typography variant="body1" mr={16}>
              {comment.user_name + ':'}
            </Typography>
            <Button size="small" color="warning" onClick={handleDelete}>
              delete
            </Button>
          </Box>
          <Box m={1}>
            <Typography variant="body1">
              {comment.content}
            </Typography>
          </Box>
          <Box sx={{display:'flex', justifyContent:'right'}}>
            <Typography variant="info">
              {comment.date}
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Box sx={{alignItems: 'center', m:1}}>
      {comments.map(createComment)}
      <CommentBox tid={props.tid} uid={uid} update={props.update}/>
    </Box>
  );
}