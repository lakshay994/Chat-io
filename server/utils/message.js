const moment = require('moment');

let generateMessage = function(from, text){
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    }
};

let generateLocationMessage = function(from, lat, long){
    return{
        from: from,
        url: `https://google.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
}