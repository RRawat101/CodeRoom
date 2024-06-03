import React, { useContext, useEffect } from 'react';
import { CodeEditorContext } from './codeEditorProvider';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const CodeOutput = () => {
  const { output, setOutput , codeEditorSocket} = useContext(CodeEditorContext);
  const socket=codeEditorSocket;
  useEffect(() => {
    socket.on('outputChange', (newout) => {
      console.log("outputchange processed");
      setOutput(newout);
    });
  }, []);
  

  return (
    <div className='codeOutputContainer'>  
      <Paper elevation={1} style={{ padding: 20, textAlign: 'left', marginTop:'8px', padding: '8px', backgroundColor: '#e0e0e0' }}>
        <pre style={{ whiteSpace: 'pre-wrap', marginLeft: 0, flexGrow: 1  }}>
          {output}
        </pre>
    </Paper>
    </div>
  );
};


export default CodeOutput;
