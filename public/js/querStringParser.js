let queryStringParser = function(qstring){
    qstring = qstring.replace('?', '');
    qstring = qstring.replace('&', '=');
    let qArr = qstring.split('=');
    let displayName = qArr[1];
    let room = qArr[3];
    return {
        displayName: displayName,
        room: room
    }
};