import { Box, IconButton, Paper } from "@mui/material";
import {CommentBox} from "./CommentBox.jsx";



export function CommentSheet(props) {

  const createComment = (props) => {
    return (
      <Paper>
        something
      </Paper>
    );
  }

  const list = ['1'];

  return (
    <Box sx={{alignItems: 'center', m:1}}>
      {list.map(createComment)}
      <CommentBox />
    </Box>
  );
}