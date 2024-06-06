const { log } = require("console");

let users = {};
let rooms = {};

function addUser(socketId, userInfo) {
  users[socketId] = userInfo;
  console.log("user added",socketId,userInfo)
}

function removeUser(socketId) {
  delete users[socketId];
}

function getUsers() {
  return Object.values(users);
}

function getUsersInRoom(roomId) {
  return Object.values(users).filter(user => user.roomId === roomId);
}

function getRoomBySocketId(socketId) {
  return users[socketId] ? users[socketId].roomId : null;
}

const initializeUserSocket = (io) => {
  const userSocket = io.of('/user');

  userSocket.on('connection', (socket) => {

    console.log('Client connected');

    socket.on('joinRoom', ({ roomId, userInfo }) => {
      socket.join(roomId);
      const randomUsername = `user#${Math.floor(Math.random() * 1000)}`;
      addUser(socket.id, { name: randomUsername, roomId });
      console.log(getUsersInRoom(roomId))
      userSocket.to(roomId).emit('usersChange', getUsersInRoom(roomId));
      console.log(`User ${randomUsername} joined room ${roomId}`);
    });

    socket.on('leaveRoom', ({ roomId }) => {
      console.log("leaverequest on",roomId,socket.id)
      socket.leave(roomId);
      removeUser(socket.id);
      userSocket.to(roomId).emit('usersChange', getUsersInRoom(roomId));
      console.log(`User left room ${roomId}`);
    });


    socket.on('disconnect', () => {
      const roomId = getRoomBySocketId(socket.id);
      removeUser(socket.id);
      if (roomId) {
        userSocket.to(roomId).emit('usersChange', getUsersInRoom(roomId));
      }
      console.log('Client disconnected');
    });
  });
};


module.exports = {getUsers,getRoomBySocketId,getUsersInRoom,addUser,removeUser, initializeUserSocket,getRoomBySocketId,getUsersInRoom,getUsers};

