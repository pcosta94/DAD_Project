const io = require('socket.io');

export class WebSocketServer {

    public io: any;

    public init = (server: any) => {
        this.io = io.listen(server);
        this.io.sockets.on('connection', (client: any) => {
            client.emit('players', Date.now() + ': Welcome to battleship');
            client.broadcast.emit('players', Date.now() + ': A new player has arrived');
            client.on('chat', (data) => this.io.emit('chat', data));
        });
    };
   public notifyAll = (channel: string, message: string) => {
        this.io.sockets.emit(channel, message);
    };
};
