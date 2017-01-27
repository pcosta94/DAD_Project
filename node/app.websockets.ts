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
    public games: any[] = [];

    public init = (server: any) => {
        this.io = io.listen(server);   

        this.io.sockets.on('connection', (client: any) => {
            client.player = new Player();

            client.on('login', (loggedUser) => {
                client.player.username = loggedUser.username;
                let date = new Date();
                let dateFormat = [date.getMonth() + 1,  date.getDate(), date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

                client.broadcast.emit('players', dateFormat + ': ' + loggedUser.username  + ' ligou-se ao jogo.');
            });

            client.on('delete_game', (id) => {
                client.player.games[id] = [];
                this.games[id]  = [];
                this.games.forEach(game =>{
                    game = {};
                });
                console.log(this.games);
                this.io.emit('delete_game', 'Game deleted!'); 
            });

            client.on('new_game', (data) => {

                let baralho: Baralho = new Baralho();

                this.games[data.game._id] = new Game(data.game._id,data.game.creatorUsername,data.game.state,0,0,{},baralho,data.game.players);
                console.log(this.games);
                let playerGame = {
                    username: data.user.username,
                    gameId: data.game._id,
                    pontos: 0,
                    renuncia: false,
                };
                //console.log(playerGame.mao);
                client.player.games[data.game._id] = playerGame;
                client.join(data.game._id);
                client.broadcast.emit('new_game', data.game);
                client.broadcast.emit('players',  Date.now() + ': New game created by' + data.game.creatorUsername );
                
            });

            client.on('join_game', (data) => {

                let baralho: any = this.games[data.game._id].baralho;

                this.games[data.game._id].players.push(data.user);

                let playerGame = {
                    username: data.user.username,
                    gameId: data.game._id,
                    pontos: 0,
                    renuncia: false,
                }
                
                client.player.games[data.game._id] = playerGame;
                client.join(data.game._id);
                this.io.emit('update_game', 'User joinned game');

            });

            client.on('start_game', (game) => {
                let date = new Date();
                let dateFormat = [date.getMonth() + 1,  date.getDate(), date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

                this.games[game._id].gameStart = dateFormat;
                this.games[game._id].state = 'playing';
                //console.log(this.games[game._id]);
                this.io.to(game._id).emit('start_game', game._id);
            });

            client.on('playing_game', (id) => {
                //console.log(this.games[id]);
                this.io.to(id).emit('playing_game', this.games[id]);
            });

            client.emit('players', Date.now() + ': Welcome to Sueca');
            client.broadcast.emit('players', Date.now() + ': A new player has arrived');
            client.on('chat', (data) => this.io.emit('chat', data));
            client.on('chat-lobby', (data) => this.io.emit('chat', data));
            client.on('chat-game', (data) => this.io.to(data.game).emit('chat-game', data.message));                     
        });

    };



    public notifyAll = (channel: string, message: string) => {
        this.io.sockets.emit(channel, message);
    };


};
