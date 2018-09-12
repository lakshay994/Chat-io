let socket = io();

const messageList = document.querySelector('#message-list');
const sendLocation = document.querySelector('#send-location');

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('newMessage', function(message){
    console.log('New Message', message);

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${message.from}: ${message.text}`));
    messageList.appendChild(li);
});

socket.on('newLocationMessage', function(location){
    console.log(location.url);

    const li = document.createElement('li');
    let message = document.createTextNode(`${location.from}: `);

    const a = document.createElement('a');
    let url = location.url;
    a.setAttribute('href', url);
    a.appendChild(document.createTextNode('My Current Location'));
    li.appendChild(a);
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

    message.value = '';
    e.preventDefault();
});

sendLocation.addEventListener('click', function(e){

    if(!navigator.geolocation){
        return alert('Geolocation is not supported by this browser.')
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('userLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        });
    }, function(err){
        alert('Unable to fetch location');
        console.log(err);
    });

    e.preventDefault();
});