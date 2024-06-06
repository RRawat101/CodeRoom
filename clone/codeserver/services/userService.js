let users = {};

function addUser(socketId, userInfo) {
  users[socketId] = userInfo;
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

module.exports = { addUser, removeUser, getUsers, getUsersInRoom, getRoomBySocketId };
