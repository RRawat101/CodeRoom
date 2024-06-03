const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const initializeEditorSocket = require('./services/EditorService.js');

const corsOptions = {
  origin: 'http://localhost:3000',
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

initializeEditorSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
