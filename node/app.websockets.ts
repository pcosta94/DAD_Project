const io = require('socket.io');
import { Baralho } from '../angular/app/game/baralho';


export class Player {
    public username: string = '';
    public games: Game[] = [];

    constructor(){}
}

export class Game{
    public playerId: string;
    public gameId: string;
    //public gameDeck: Baralho;
    public playerHand: any[];
    public playOrder: number;
    public points: number = 0;
    public renuncia: false;
    
    constructor(player_id: string, game_id: string, playerHand: any[], playOrder: number){
        this.playerId = player_id;
        this.gameId = game_id;
        this.playerHand = playerHand;
        this.playOrder = playOrder;
    }
}

export class WebSocketServer {

    public io: any;

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
               
                let empty: any[] = []


                client.player.games = empty; 
                
                this.io.emit('delete_game', 'Game deleted!'); 
            });

            client.on('new_game', (data) => {
                let gameDeck: Baralho = data.game.baralho;

                let hand: any[] = [];
                let order: any;

                switch (data.user._id) {
                    case data.game.players[0]._id:
                        hand = gameDeck.pMao;
                        order = 1;
                        break;
                    case data.game.players[1]._id:
                        hand = gameDeck.tMao;
                        order = 3;
                        break;
                    case data.game.players[2]._id:
                        hand = gameDeck.sMao;
                        order = 2;
                        break;
                    case data.game.players[3]._id:
                        hand = gameDeck.qMao;
                        order = 4;
                        break;
                }
                       
                   
                let playerGame = new Game(data.user._id, data.game._id, hand, order);
                client.player.games.push(playerGame);

                client.join(data.game._id);
                client.broadcast.emit('new_game', data.game);
                client.broadcast.emit('players',  Date.now() + ': New game created by ' + data.game.creatorUsername );
                
            });

            client.on('join_game', (data) => {

                let gameDeck: Baralho = data.game.baralho;

                let hand: any[] = [];
                let order: any;

                switch (data.user._id) {
                    case data.game.players[0]._id:
                        hand = gameDeck.pMao;
                        order = 1;
                        break;
                    case data.game.players[1]._id:
                        hand = gameDeck.tMao;
                        order = 3;
                        break;
                    case data.game.players[2]._id:
                        hand = gameDeck.sMao;
                        order = 2;
                        break;
                    case data.game.players[3]._id:
                        hand = gameDeck.qMao;
                        order = 4;
                        break;
                }
                     

                let playerGame = new Game(data.user._id, data.game._id, hand, order);

                client.player.games.push(playerGame);

                //console.log(client.player.games[data.game._id]);
                client.join(data.game._id);
                this.io.emit('update_game', 'User joinned game');

            });

            client.on('start_game', (game) => {
                
                
                //console.log(client.player.games);
                this.io.to(game._id).emit('start_game', game._id);
            });

            client.on('playing_game', (game) => {
                let playerGames: Game[] = client.player.games;
                
                //console.log(playerGames);
                playerGames.forEach( pGame => {
                    if(pGame.gameId == game){
                        this.io.to(game).emit('playing_game', pGame);
                    }
                });
            });

            client.on('play_card', (data) => {
                this.io.to(data.game).emit('play_card',data);
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
