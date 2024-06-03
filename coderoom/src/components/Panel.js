import React, { useContext, useEffect } from 'react';
import { CodeEditorContext } from './codeEditorProvider';
import { executeProgram } from '../services/onlineCompiler';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Panel = () => {
  const { setOutput ,code ,inputValue, setInput , codeEditorSocket} = useContext(CodeEditorContext);
  const socket=codeEditorSocket;
  const handleChange = (e) => {
    setInput(e.target.value)
    socket.emit('inputChange',e.target.value);  
  };
  
  useEffect(() => {
    // Listen for code changes from the server
    socket.on('inputChange', (newinput) => {
      console.log("inputchange processed");
      setInput(newinput);
    });
    }, []);

    const handleRun=()=>{
        console.log("runreceinved");
        socket.emit('runRequest',code);    
    }

    return (
      <Box display="flex" alignItems="stretch" alignContent="center" marginTop={'32px'}>
        <TextField
          id="standard-basic"
          label="Input"
          
          rows={1}
          fullWidth
          variant="outlined"
          // margin="normal"
          value={inputValue}
          onChange={handleChange}
          sx={{ 
            marginTop:'8px',
            borderRadius: 0 }}
        />
  
        <Button
          variant="contained"
          onClick={handleRun}
          margin="normal"
          sx={{
            borderRadius: 0,
            height: '100%',
            marginLeft: '8px',
            marginTop: '16.5px'
          }}
        >
          Run
        </Button>
      </Box>
    );
};

export default Panel;