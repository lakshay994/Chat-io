const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('newMessage', (message) => {
        console.log('New Message');
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()            
        });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from the client');
    });
});

server.listen(port, () => {
    console.log(`Server now listening at port ${port}`);
});