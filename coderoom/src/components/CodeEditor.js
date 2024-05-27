import { useEffect, useState, useRef } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';


function CodeEditor({socket}) {

  const [code, setCode] = useState("function add(a, b) {\n  return a + b;\n}");

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // Send code changes to the server
    socket.emit('codeChange', newCode);
  };

  useEffect(() => {
    // Listen for code changes from the server
    socket.on('codeChange', (newCode) => {
      console.log("codechange processed");
      setCode(newCode);
    });
  }, []);

    return (
        <>
            <CodeMirror
                style={{ fontSize: "32px", textAlign: "left" }}
                value={code}
                onChange={handleCodeChange}
                height="80vh"
                width="70vw"
                theme={'dark'}
                extensions={[javascript({ jsx: true })]}
            />
        </>
    );
}

export default CodeEditor;