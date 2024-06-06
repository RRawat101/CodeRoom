import React, { useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import UserList from './components/UserList';
import './App.css'; // Import the CSS file
import { UserProvider } from './provider/userProvider';
import { CodeEditorProvider } from './provider/codeEditorProvider';
import io,{Manager} from 'socket.io-client';

const opts={
}

const Socket = io("http://localhost:5000/codeeditor"); // Connect to code-editor namespace
// const codeEditorSocket = io("http://localhost:5000/codeeditor"); // Connect to code-editor namespace
// const userSocket = io("http://localhost:5000/user",{...opts}); // Connect to user namespace


function App() {
  // useEffect(() => {
  //   console.log('CodeEditor namespace connected:', codeEditorSocket.id);
  //   console.log('User namespace connected:', userSocket.id);
  // }, []);

  return (
    <div className="App">
      <h1>Live Code Sharing Platform</h1>
      <div className="container">
        <div className="code-editor">
          <CodeEditorProvider socket={Socket}>
            <CodeEditor />
          </CodeEditorProvider>
        </div>
        <div className="user-list">
          <UserProvider socket={Socket}>
            <UserList />
          </UserProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
