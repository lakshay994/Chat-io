const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validators');
const {Users} = require('./utils/users');

const app = express();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketIO(server);
let users = new Users();

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('join', (params, callback) => {
        console.log(params);
        if(!isRealString(params.displayName) || !isRealString(params.room)){
            return callback('Name and Room Name are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.displayName, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.displayName} has joined the chat.`));

        callback();
    });

    socket.on('createMessage', (message) => {
        console.log('New Message');
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('userLocation', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.long));
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left the chat`));
    });
});

server.listen(port, () => {
    console.log(`Server now listening at port ${port}`);
});