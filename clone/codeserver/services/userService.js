// userService.js

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

module.exports = { addUser, removeUser, getUsers };
