import React, { useContext, useEffect } from 'react';
import { CodeEditorContext } from '../provider/codeEditorProvider';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const CodeOutput = () => {
  const { output, setOutput , socket} = useContext(CodeEditorContext);
  socket.on('outputChange', (newout) => {
    console.log("outputchange processed");
    setOutput(newout);})
  // useEffect(() => {
  //   });
  // }, []);
  

  return (
    <div className='codeOutputContainer'>  
      <Paper elevation={1} style={{ color: "white", textAlign: 'left', marginTop:'8px', padding: '8px', backgroundColor: '#000000', borderRadius: 0 }}>
        <pre style={{ whiteSpace: 'pre-wrap', marginLeft: 0, flexGrow: 1 }}>
          {output}
        </pre>
      </Paper>
    </div>
  );
};


export default CodeOutput;
