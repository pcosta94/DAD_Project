const io = require('socket.io');
import { Baralho } from '../angular/app/game/baralho';

export class Player {
    public username: string;
    public games;

    constructor() {
        this.username = "";
        this.games = {};
    }
}

export class WebSocketServer {

    public io: any;

    public init = (server: any) => {
        this.io = io.listen(server);   

        this.io.sockets.on('connection', (client: any) => {
            client.player = new Player();

            

            client.on('new_game', (data) => {
                let game = {
                    gameState: data.game.state,
                    mao: data.baralho.atribuirMao(),
                    pontos: 0,
                    equipa: {},
                };
                client.player.games[data.game._id] = game;
                client.join(data.game._id);
                client.broadcast.emit('new_game',data);
            });

            client.emit('players', Date.now() + ': Welcome to Sueca');
            client.broadcast.emit('players', Date.now() + ': A new player has arrived');
            client.on('chat', (data) => this.io.emit('chat', data));
            client.on('chat-lobby', (data) => this.io.emit('chat', data));                     
        });

    };



    public notifyAll = (channel: string, message: string) => {
        this.io.sockets.emit(channel, message);
    };


};
