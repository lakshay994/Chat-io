let socket = io();

const messageList = document.querySelector('#message-list');

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('newMessage', function(message){
    console.log('New Message', message);

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${message.from}: ${message.text}`));
    messageList.appendChild(li);
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

document.querySelector('#message-form').addEventListener('submit', (e) => {

    let from = 'User';
    let message = document.querySelector('#message').value;

    socket.emit('createMessage', {
        from: from,
        text: message
    });
    e.preventDefault();
});