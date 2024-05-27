const { addUser, removeUser, getUsers } = require('../services/userService.js');

module.exports = (codeEditorSocket) => {
    codeEditorSocket.on('connection', (socket) => {
        console.log('Client connected to code editor');

        socket.on('addUser', (userInfo) => {
            const randomUsername = `user#${Math.floor(Math.random() * 1000)}`;
            addUser(socket.id, { name: randomUsername });
            codeEditorSocket.emit('usersChange', getUsers());
        });

        socket.on('codeChange', (newCode) => {
            // Emit code change event to all clients in the code-editor namespace
            codeEditorSocket.emit('codeChange', newCode);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected from code editor');
            removeUser(socket.id);
            codeEditorSocket.emit('usersChange', getUsers());
        });
    });
};
