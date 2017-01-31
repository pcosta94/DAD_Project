const io = require('socket.io');
import { Baralho } from '../angular/app/game/baralho';
import { Carta } from '../angular/app/game/carta';

export class Player {
    public username: string = '';
    public games: Game[] = [];

    constructor(){}
}

export class Game{
    public playerId: string;
    public gameId: string;
    public playerHand: any[];
    public playerTurn: number;
    public playerNumber: number;
    public points: number = 0;
    public trunfo: any;
    public renuncia: boolean = false;
    
    constructor(player_id: string, game_id: string, playerHand: any[], playerTurn: number, player: number, trunfo: any){
        this.playerId = player_id;
        this.gameId = game_id;
        this.playerHand = playerHand;
        this.playerTurn = playerTurn;
        this.playerNumber = player;
        this.trunfo = trunfo;
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
                let turn: any;
                let player: any;

                switch (data.user._id) {
                    case data.game.players[0]._id:
                        hand = gameDeck.pMao;
                        turn = 1;
                        player = 1;
                        break;
                    case data.game.players[1]._id:
                        hand = gameDeck.tMao;
                        turn = 3;
                        player = 2;
                        break;
                    case data.game.players[2]._id:
                        hand = gameDeck.sMao;
                        turn = 2;
                        player = 3;
                        break;
                    case data.game.players[3]._id:
                        hand = gameDeck.qMao;
                        turn = 4;
                        player = 4;
                        break;
                }
                       
                   
                let playerGame = new Game(data.user._id, data.game._id, hand, turn, player, gameDeck.trunfo);
                client.player.games.push(playerGame);

                client.join(data.game._id);
                client.broadcast.emit('new_game', data.game);

                let date = new Date();
                let dateFormat = [date.getMonth() + 1,  date.getDate(), date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

                client.broadcast.emit('players', dateFormat + ': New game created by ' + data.game.creatorUsername );
                
            });

            client.on('join_game', (data) => {

               let gameDeck: Baralho = data.game.baralho;

                let hand: any[] = [];
                let turn: any;
                let player: any;

                switch (data.user._id) {
                    case data.game.players[0]._id:
                        hand = gameDeck.pMao;
                        turn = 1;
                        player = 1;
                        break;
                    case data.game.players[1]._id:
                        hand = gameDeck.tMao;
                        turn = 3;
                        player = 2;
                        break;
                    case data.game.players[2]._id:
                        hand = gameDeck.sMao;
                        turn = 2;
                        player = 3;
                        break;
                    case data.game.players[3]._id:
                        hand = gameDeck.qMao;
                        turn = 4;
                        player = 4;
                        break;
                }
                       
                   
                let playerGame = new Game(data.user._id, data.game._id, hand, turn, player, gameDeck.trunfo);
                client.player.games.push(playerGame);

                client.join(data.game._id);
                this.io.emit('join_game', data);

                 let date = new Date();
                let dateFormat = [date.getMonth() + 1,  date.getDate(), date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

                client.broadcast.emit('players', dateFormat + ': ' + data.game.creatorUsername + ' joinned game ' + data.game._id);

            });

            client.on('start_game', (game) => {
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
                let playerGames: Game[] = client.player.games;
                let play = data.play;
                let hand: any[] = [];
                let playedCard:any;
          
                playerGames.forEach( pGame => {
                    if(pGame.gameId == data.game && pGame.playerId == data.play.playerId){
                        pGame.playerHand.forEach(card =>{
                            if(card.imagePath == play.playedCard.imagePath){
                               card.jogada = 'played';
                               playedCard = card;
                            }
                        });
                        hand = pGame.playerHand;
                    }
                });


                //console.log(hand);
                //console.log(playedCard);

                this.io.to(data.game).emit('play_card', {hand, play, playedCard} );
            });

            client.on('played_round', (data) => {

                let plays: any[] = data.plays;
                let games: any[] = client.player.games;
                let assist: any;
                let gameId: any;
                let winningPlay: any;
                let winningPoints: number = 0;
                let winnigPlayerNumber: number;

                console.log(plays);
                plays.forEach( play => {
                    if(winningPlay == undefined) {
                        winningPlay = play;
                        assist = play.naipe;
                        gameId = play.gameId;
                    }
                    else {
                        if(play.playedCard.naipe == assist) {
                            if(winningPlay.playedCard.pontos < play.playedCard.pontos){
                                winningPlay = play;
                                console.log('vim aos  pontos')
                            }
                        }
                        else {
                            games.forEach( game => {
                                if(game.gameId == gameId && game.playerId == play.playerId){
                                    game.playerHand.forEach( card =>{
                                        if(card.jogada != 'played' && card.naipe == assist){
                                            game.renuncia = true;
                                            console.log('vim a renuncia')
                                        }
                                    });
                                }
                            });
                            if(play.playedCard.naipe == data.trunfo){
                                console.log('vim ao trunfo')
                                if(winningPlay.playedCard.naipe != data.trunfo){
                                    winningPlay = play;
                                      
                                      console.log('vim ao um trunfo')
                                }
                                else {
                                    if(winningPlay.playedCard.pontos < play.playedCard.pontos){
                                        winningPlay = play;
                                        console.log('vim ao segundo trunfo')
                                    }
                                }
                            }
                        }
                    }
                    winningPoints += play.playedCard.pontos;
                });

                console.log(winningPoints);
                console.log(winningPlay);
                console.log(winnigPlayerNumber);

                games.forEach( game => {
                    if(game.gameId == gameId){
                       if(game.playerId == winningPlay.playerId){
                           game.points += winningPoints;
                           winnigPlayerNumber = game.playerNumber;
                       }
                    }
                });

                games.forEach( game => {
                    if(game.gameId == gameId){

                        if(game.playerNumber == 1){
                            switch (winnigPlayerNumber) {
                                case 1:
                                    game.playerTurn = 1;
                                    break;
                                case 2:
                                    game.playerTurn = 3;
                                    break;
                                case 3:
                                    game.playerTurn = 4;
                                    break;
                                case 4:
                                    game.playerTurn = 2;
                                    break;
                            }
                        }
                        if (game.playerNumber == 2) {
                            switch (winnigPlayerNumber) {
                                case 1:
                                    game.playerTurn = 3;
                                    break;
                                case 2:
                                    game.playerTurn = 1;
                                    break;
                                case 3:
                                    game.playerTurn = 2;
                                    break;
                                case 4:
                                    game.playerTurn = 4;
                                    break;
                            }
                        }
                        if (game.playerNumber == 3) {
                            switch (winnigPlayerNumber) {
                                case 1:
                                    game.playerTurn = 2;
                                    break;
                                case 2:
                                    game.playerTurn = 4;
                                    break;
                                case 3:
                                    game.playerTurn = 1;
                                    break;
                                case 4:
                                    game.playerTurn = 3;
                                    break;
                            }
                        }
                        if (game.playerNumber == 4) {
                            switch (winnigPlayerNumber) {
                                case 1:
                                    game.playerTurn = 4;
                                    break;
                                case 2:
                                    game.playerTurn = 2;
                                    break;
                                case 3:
                                    game.playerTurn = 3;
                                    break;
                                case 4:
                                    game.playerTurn = 1;
                                    break;
                            }
                        }
                        this.io.to(gameId).emit('played_round', game);
                    }
                });
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
