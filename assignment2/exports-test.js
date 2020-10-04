const EventEmitter = require('events');
module.exports = {
    "emitter" : new EventEmitter()
}

setTimeout( ()=> {
    module.exports.emit('ready');
}, 1000)
