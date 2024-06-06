import React from 'react';
import CodeEditor from './components/CodeEditor';
import UserList from './components/UserList';
import { javascript } from '@codemirror/lang-javascript';
import './App.css'; // Import the CSS file

import io from 'socket.io-client';
import { CodeEditorProvider } from './components/codeEditorProvider';

const codeEditorSocket = io('http://localhost:5000/codeeditor'); // Connect to code-editor namespace

function App() {
  return (
    <div className="App">
      <h1>Live Code Sharing Platform</h1>
      <div className="container">
        <div className="code-editor">
          <CodeEditorProvider>
            <CodeEditor/>
          </CodeEditorProvider>
        </div>
        <div className="user-list">
          <UserList socket={codeEditorSocket} />
        </div>
        

      </div>
        
    </div>
  );
}

export default App;
