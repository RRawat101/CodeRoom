const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUsers } = require('./services/userService.js');
const check=1;
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    credentials: true, // Allow credentials (e.g., cookies)
  };
  
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: corsOptions, // Apply CORS options to Socket.IO server
  });
  
app.use(cors());

const codeEditorSocket=io.of('/codeeditor');
codeEditorSocket.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('addUser', (userInfo) => {
    
    const randomUsername = `user#${Math.floor(Math.random() * 1000)}`;

    addUser(socket.id, {
        name: randomUsername,
        // avatar: 'user-avatar.jpg', // You can add default avatar here if needed
        // status: 'Online', // Default status
    });
    socket.emit('usersChange', getUsers());
  });

  socket.on('codeChange', (newCode) => {
    console.log("incoming codechange requests")
    // Broadcast code changes to all connected clients
    codeEditorSocket.emit('codeChange', newCode);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    removeUser(socket.id);
    codeEditorSocket.emit('usersChange', getUsers());
  });
});

// WebSocket endpoint for audio and video streaming
const mediaSocket = io.of('/media');
mediaSocket.on('connection', (socket) => {
  console.log('Client connected to media stream');

  // Handle signaling messages for WebRTC connections
  socket.on('signal', (signal, peerId) => {
      // Broadcast signaling message to the specific peer
      socket.to(peerId).emit('signal', signal, socket.id);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
      console.log('Client disconnected from media stream');
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});