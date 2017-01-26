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
    public games: Game[] = [];

    public init = (server: any) => {
        this.io = io.listen(server);   

        this.io.sockets.on('connection', (client: any) => {
            client.player = new Player();
            
            client.on('delete_game', (id) => {
                client.player.games[id] = [];
                this.io.emit('delete_game', 'Game deleted!'); 
            });

            client.on('new_game', (game) => {

                let baralho: Baralho = new Baralho();

                this.games[game._id] = new Game(game._id,game.creatorUsername,game.state,0,0,{},baralho,game.players);
                
                let playerGame = {
                    gameId: game._id,
                    mao: baralho.atribuirMao(),
                    pontos: 0,
                    renuncia: false,
                };

                client.player.games[game._id] = playerGame;
                client.join(game._id);
                client.broadcast.emit('new_game', game);
                client.broadcast.emit('palyers',  Date.now() + ': New game created by' + game.ceartorUsername );
                
            });

            client.on('join_game', (data) => {

                let baralho: any = this.games[data.game._id].baralho;

                this.games[data.game._id].players.push(data.player);

                let playerGame = {
                    gameId: data.game._id,
                    mao: baralho.atribuirMao(),
                    pontos: 0,
                    renuncia: false,
                }

                client.player.games[data.game._id] = playerGame;
                client.join(data.game._id);
                this.io.emit('update_game', 'User joinned game');

            });

            client.on('start_game', (game) => {
                this.games[game._id].state = game.state;
                this.games[game._id].gameStart = Date.now();
                console.log(client.player.games[game._id]);
                this.io.to(game._id).emit('start_game', game._id);
            });

            client.on('playing_game', (id) => {
                console.log(client.player.games[id]);
                this.io.emit('playing_game', client.player.games[id]);
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
