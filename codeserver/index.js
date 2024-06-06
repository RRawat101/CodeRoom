const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const initializeEditorSocket = require('./services/EditorService.js');
// const {initializeUserSocket}= require('./services/userService.js');

const corsOptions = {
  origin: `*`,
  methods: ['GET', 'POST'],
  credentials: true,
};

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: corsOptions });
// console.log(io);
app.use(cors());

io.on('connection', (socket) => {
  console.log('A client connected. Socket ID:', socket.id);
  console.log(socket)
});

initializeEditorSocket(io); 
// initializeUserSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
