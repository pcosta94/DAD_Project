const io = require('socket.io');
import { Baralho } from '../angular/app/game/baralho';
import { Game } from '../angular/app/game/game';


export class Player {
    public username: string;
    public games;

    constructor(){
        this.username = '';
        this.games = {};
    }
}

export class WebSocketServer {

    public io: any;


    public init = (server: any) => {
        this.io = io.listen(server);

        this.io.sockets.on('connection', (client: any) => {
            client.player = new Player();


            client.on('new_game', (game) => {
                let newGame = {
                    mao: game.baralho.pMao,
                    pontos: 0,
                    renuncia: false,
                };

                client.player.username = game.players[0].player.username
                client.player.games[game._id] = newGame;
                client.join(game._id);
                client.broadcast.emit('new_game', game);
                console.log(game._id);
                client.broadcast.emit('players',  Date.now() + ': New game created by' + game.ceartorUsername );

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
