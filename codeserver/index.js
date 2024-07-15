const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { PeerServer } = require('peer');
const initializeEditorSocket = require('./services/EditorService.js');
const { initializeUserSocket } = require('./services/userService.js');
const initializeVideoSocket = require('./services/videoService.js');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true,
};

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: corsOptions });

app.use(cors());

io.on('connection', (socket) => {
  console.log('A client connected. Socket ID:', socket.id);
});

// Initialize PeerServer
const peerServer = PeerServer({ port: 9000, path: '/' });

// Initialize the different namespaces and their respective services
initializeEditorSocket(io);
// initializeVideoSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
