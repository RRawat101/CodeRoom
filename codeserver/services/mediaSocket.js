module.exports = (mediaSocket) => {
    mediaSocket.on('connection', (socket) => {
        console.log('Client connected to media stream');

        // Handle signaling messages for WebRTC connections
        socket.on('signal', (signal, peerId) => {
            // Broadcast signaling message to the specific peer
            socket.to(peerId).emit('signal', signal, socket.id);
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('Client disconnected from media stream');
        });
    });
};
