import { Box, IconButton, Paper, Typography } from "@mui/material";
import {CommentBox} from "./CommentBox.jsx";


/**
 * 
 * @param {Object} props
 * @param {[]} props.comments 
 * @returns 
 */
export function CommentSheet(props) {
  const comments = props.comments;

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
    return (
      <Paper key={comment.cid}>
        <Box m={1}>
          <Box>
            <Typography variant="body2">
              {comment.user_name + ':'}
            </Typography>
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
      <CommentBox />
    </Box>
  );
}