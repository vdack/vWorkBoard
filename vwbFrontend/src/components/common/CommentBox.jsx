// The Code is Copied from https://mui.com/joy-ui/react-textarea/
// An example of Comment Box.
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { createComment } from '../../api/commentApi';

/**
 * 
 * @param {Object} props
 * @param {number} props.tid 
 * @param {number} props.uid
 * @param {function} props.update  
 * @returns 
 */
export  function CommentBox(props) {
  const {tid, uid, update} = props;
  const [content, setContent] = React.useState('');

  const handleSubmit = async () => {
    const res = await createComment(tid, uid, content);
    console.log('create comment res:', res);
    setContent('');
    update();
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  return (
    <FormControl sx={{mt:1}}>
      <Textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Type something here…"
        minRows={3}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            <Button sx={{ ml: 'auto' }} onClick={handleSubmit}>Send</Button>
          </Box>
        }
        sx={{
          minWidth: 200,
        }}
      />
    </FormControl>
  );
}
