import { experimentalStyled } from '@mui/material';
import React, { createContext, useState } from 'react';
import io from 'socket.io-client';

 // Connect to code-editor namespace
const CodeEditorContext = createContext();
const codeEditorSocket = io('http://localhost:5000/codeeditor');
const CodeEditorProvider = ({ children }) => {
  const [code, setCode] = useState('');
  const [inputValue, setInput] = useState('');
  const [output, setOutput] = useState(`testvalue
  f
  d
  d
  experimentalStylede
  d
  `);
  

  return (
    <CodeEditorContext.Provider value={{ code, setCode, inputValue, setInput, output, setOutput, codeEditorSocket }}>
      {children}
    </CodeEditorContext.Provider>
  );
};

export { CodeEditorContext, CodeEditorProvider };
