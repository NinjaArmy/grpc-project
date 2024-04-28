const Plugin = require('./pluginInterface.js');

class MessagePlugin extends Plugin {
    log(message) {
        console.log('Plugin Message:', message);
    }
}

module.exports = MessagePlugin;