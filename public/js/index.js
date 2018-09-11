let socket = io();

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('newMessage', function(email){
    console.log('New Message', email);
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});