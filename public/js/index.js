let socket = io();

const messageList = document.querySelector('#messages');
const sendLocation = document.querySelector('#send-location');

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('newMessage', function(message){
    console.log('New Message', message);

    let formattedTime = moment(message.createdAt).format('h:mm a');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${message.from} (${formattedTime}): ${message.text}`));
    messageList.appendChild(li);
});

socket.on('newLocationMessage', function(location){
    console.log(location.url);

    var formattedTime = moment(message.createdAt).format('h:mm a');

    const li = document.createElement('li');
    let message = document.createTextNode(`${location.from}: (${formattedTime})`);

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
    let messageInput = document.querySelector('#message');

    socket.emit('createMessage', {
        from: from,
        text: messageInput.value
    });

    messageInput.value = '';
    e.preventDefault();
});

sendLocation.addEventListener('click', function(e){

    if(!navigator.geolocation){
        return alert('Geolocation is not supported by this browser.')
    }

    sendLocation.innerHTML = 'Sending....';
    sendLocation.disabled = true;
    navigator.geolocation.getCurrentPosition(function(position){
        console.log('sent')
        sendLocation.innerHTML = 'Send Location';
        sendLocation.disabled = false;
        socket.emit('userLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        });
    }, function(err){
        alert('Unable to fetch location');
        sendLocation.innerHTML = 'Send Location';
        sendLocation.disabled = false;
        console.log(err);
    });

    e.preventDefault();
});