import React from 'react';
import CodeEditor from './components/CodeEditor';
import UserList from './components/UserList';
import './App.css';
import { CodeEditorProvider } from './provider/codeEditorProvider';
import io from 'socket.io-client';

const socket = io("http://localhost:5000/codeeditor");

function App() {
  return (
    <div className="App">
      <CodeEditorProvider socket={socket}>
      <h1>Live Code Sharing Platform</h1>
      <div className="container">
        <div className="code-editor">          
            <CodeEditor />
        </div>
        <div className="user-list">
          <h2>Users in the room</h2>
            <UserList />
        </div>
      </div>
      </CodeEditorProvider>
    </div>
  );
}

export default App;
