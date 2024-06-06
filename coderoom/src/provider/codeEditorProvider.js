
import React, { createContext, useState } from 'react';
import io from 'socket.io-client';

const CodeEditorContext = createContext();


const CodeEditorProvider = ({ children, socket }) => {
  
  const [code, setCode] = useState('x=10; \ny=25; \nz=x+y; \nprint ("sum of x+y =", z);');
  const [inputValue, setInput] = useState('');
  const [output, setOutput] = useState(`testvalue`);
  const [language,setLanguage]=useState('python');
  return (
    <CodeEditorContext.Provider value={
      { 
        code, setCode, inputValue, setInput, output, setOutput, socket,
        language, setLanguage

      }
      }>
      {children}
    </CodeEditorContext.Provider>
  );
};

export { CodeEditorContext, CodeEditorProvider };
