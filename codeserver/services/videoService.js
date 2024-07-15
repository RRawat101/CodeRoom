// videoService.js
const { addUser, removeUser, getUsersInRoom, getRoomBySocketId } = require('./userService');

const initializeVideoSocket = (io) => {
  const videoSocket = io.of('/video');

  io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).broadcast.emit('user-connected', userId)
  
      socket.on('leaveRoom', () => {
        socket.to(roomId).broadcast.emit('user-disconnected', userId)
      })
    })

  });
};

module.exports = initializeVideoSocket;
