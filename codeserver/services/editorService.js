const executeProgram = require('./compilerAPI');
const { addUser, removeUser, getUsers } = require('./userService');

const initializeEditorSocket = (io) => {
  const codeEditorSocket = io.of('/codeeditor');

  codeEditorSocket.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('addUser', (userInfo) => {
      const randomUsername = `user#${Math.floor(Math.random() * 1000)}`;

      addUser(socket.id, {
        name: randomUsername,
      });
      codeEditorSocket.emit('usersChange', getUsers());
    });

    socket.on('codeChange', (newCode) => {
      console.log("incoming code change request from ", socket.id);
      codeEditorSocket.emit('codeChange', newCode);
    });

    socket.on('inputChange', (newinput) => {
      console.log("incoming input change request from ", socket.id);
      codeEditorSocket.emit('inputChange', newinput);
    });

    socket.on('outputChange', (newoutput) => {
      console.log("incoming output change request from ", socket.id);
      codeEditorSocket.emit('outputChange', newoutput);
    });

    socket.on('runRequest',async (code)=>{
      console.log("runRequest received")
      const result=await executeProgram(code);
      codeEditorSocket.emit('outputChange',result)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      removeUser(socket.id);
      codeEditorSocket.emit('usersChange', getUsers());
    });
  });
};

module.exports = initializeEditorSocket;
