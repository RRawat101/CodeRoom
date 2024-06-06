const executeProgram = require('./compilerAPI');
const {getRoomBySocketId,getUsersInRoom,addUser,removeUser,getUsers} = require( './userService')


const initializeEditorSocket = (io) => {
  // console.log(io);
  const codeEditorSocket = io.of('/codeeditor');
  // console.log(codeEditorSocket);cls
  codeEditorSocket.on('connection', (socket) => {

    console.log('Client connected');

    // console.log(socket);
    socket.on('joinRoom', ({ roomId, userInfo }) => {
      socket.join(roomId);
      const randomUsername = `user#${Math.floor(Math.random() * 1000)}`;
      addUser(socket.id, { name: randomUsername, roomId });
      codeEditorSocket.to(roomId).emit('usersChange', getUsersInRoom(roomId));
      console.log(`User ${randomUsername} joined room ${roomId}`);
    });

    socket.on('leaveRoom', ({ roomId }) => {
      console.log("leaverequest on",roomId,socket.id)
      socket.leave(roomId);
      removeUser(socket.id);
      codeEditorSocket.to(roomId).emit('usersChange', getUsersInRoom(roomId));
      console.log(`User left room ${roomId}`);
    });

    socket.on('codeChange', (newCode) => {
      const roomId = getRoomBySocketId(socket.id);
      console.log("codechangerequest on",roomId,socket.id)
      if (roomId) {
        codeEditorSocket.to(roomId).emit('codeChange', newCode);
      }
    });

    socket.on('inputChange', (newInput) => {
      const roomId = getRoomBySocketId(socket.id);
      console.log("inputchangerequest on",roomId,socket.id)
      if (roomId) {
        codeEditorSocket.to(roomId).emit('inputChange', newInput);
      }
    });

    socket.on('outputChange', (newOutput) => {
      const roomId = getRoomBySocketId(socket.id);
      console.log("outputchangerequest on",roomId,socket.id)
      if (roomId) {
        codeEditorSocket.to(roomId).emit('outputChange', newOutput);
      }
    });

    socket.on('runRequest', async (code) => {
      const result = await executeProgram(code);
      const roomId = getRoomBySocketId(socket.id);
      console.log("runrequest on",roomId,socket.id)
      // if (roomId) {
        console.log(result);
        console.log(roomId);
        codeEditorSocket.to(roomId).emit('outputChange', result);
      // }
    });

    socket.on('languageChange', (lang) => {
      const roomId = getRoomBySocketId(socket.id);
      console.log("langrequest on",roomId,socket.id)
      if (roomId) {
        codeEditorSocket.to(roomId).emit('languageChange', lang);
      }
    });

    socket.on('disconnect', () => {
      const roomId = getRoomBySocketId(socket.id);
      removeUser(socket.id);
      if (roomId) {
        codeEditorSocket.to(roomId).emit('usersChange', getUsersInRoom(roomId));
      }
      console.log('Client disconnected');
    });
  });
};

module.exports = initializeEditorSocket;
