let generateMessage = function(from, text){
    return {
        from: from,
        text: text,
        createdAt: new Date().getTime()
    }
};

let generateLocationMessage = function(from, lat, long){
    return{
        from: from,
        url: `https://google.com/maps?q=${lat},${long}`
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
}