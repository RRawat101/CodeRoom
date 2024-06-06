import React, { useContext, useEffect } from 'react';
import { CodeEditorContext } from '../provider/codeEditorProvider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Panel = () =>{
  const { setOutput ,code ,inputValue, setInput , socket, language} = useContext(CodeEditorContext);
  const handleChange = (e) => {
    setInput(e.target.value)
    socket.emit('inputChange',e.target.value);  
  };
  
  useEffect(() => {
    // Listen for code changes from the server
    socket.on('inputChange', (newinput) => {
      // console.log("inputchange processed");
      setInput(newinput);
    });
    }, []);

    const handleRun=()=>{
        console.log("runreceinved",inputValue,code);
        socket.emit('runRequest',{code,inputValue,language});    
    }

    return (
      <div>
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
      </div>
    );
};

export default Panel;