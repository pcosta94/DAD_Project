const io = require('socket.io');
const ws = module.exports = {};

let wsServer = null;

ws.init = (server) => {
    wsServer = io.listen(server);
    wsServer.sockets.on('connection', function (client) {
        console.log("Client Connected");
        // TODO
        // 1a) so para o cliente que se acabou de registar
        client.emit('players',Date.now()+" -- Welcome to battleship");
        // 1b) para todos os clientes registados à excepção do ultimo
        client.broadcast.emit('players',Date.now()+" -- A new player has arrived");
        // 3)
        client.on('c    hat',(data) =>{
            console.log(data);
            // todos
            wsServer.emit('chat',data);
        })
    });
};

ws.notifyAll = (channel, message) => {
    wsServer.sockets.emit(channel, message);
};
