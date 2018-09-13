let socket = io();

const messageList = document.querySelector('#messages');
const sendLocation = document.querySelector('#send-location');

function scrollToBottom(){
    let newMessage = messageList.lastChild.previousElementSibling;

    let clientHeight = messageList.clientHeight;
    let scrollTop = messageList.scrollTop;
    let scrollHeight = messageList.scrollHeight;
    let newMessageHeight = newMessage.offsetHeight;
    let lastMessageHeight = newMessage.previousElementSibling.offsetHeight;

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messageList.scrollTop = scrollHeight;
    }
};

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('newMessage', function(message){
    console.log('New Message', message);

    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document.querySelector('#message-template').innerHTML;
    let html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    messageList.innerHTML += html;
    scrollToBottom();
});

socket.on('newLocationMessage', function(location){
    console.log(location.url);

    var formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document.querySelector('#location-message-template').innerHTML;
    let html = Mustache.render(template, {
        from: location.from,
        url: location.url,
        createdAt: formattedTime
    });

    messageList.innerHTML += html;
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