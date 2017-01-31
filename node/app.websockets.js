"use strict";
var io = require('socket.io');
var Player = (function () {
    function Player() {
        this.username = '';
        this.games = [];
    }
    return Player;
}());
exports.Player = Player;
var Game = (function () {
    function Game(player_id, game_id, playerHand, playerTurn, player, trunfo) {
        this.points = 0;
        this.renuncia = false;
        this.playerId = player_id;
        this.gameId = game_id;
        this.playerHand = playerHand;
        this.playerTurn = playerTurn;
        this.playerNumber = player;
        this.trunfo = trunfo;
    }
    return Game;
}());
exports.Game = Game;
var WebSocketServer = (function () {
    function WebSocketServer() {
        var _this = this;
        this.init = function (server) {
            _this.io = io.listen(server);
            _this.io.sockets.on('connection', function (client) {
                client.player = new Player();
                client.on('login', function (loggedUser) {
                    client.player.username = loggedUser.username;
                    var date = new Date();
                    var dateFormat = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.broadcast.emit('players', dateFormat + ': ' + loggedUser.username + ' ligou-se ao jogo.');
                });
                client.on('delete_game', function (id) {
                    var empty = [];
                    client.player.games = empty;
                    _this.io.emit('delete_game', 'Game deleted!');
                });
                client.on('new_game', function (data) {
                    var gameDeck = data.game.baralho;
                    var hand = [];
                    var turn;
                    var player;
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
                    var playerGame = new Game(data.user._id, data.game._id, hand, turn, player, gameDeck.trunfo);
                    client.player.games.push(playerGame);
                    client.join(data.game._id);
                    client.broadcast.emit('new_game', data.game);
                    var date = new Date();
                    var dateFormat = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.broadcast.emit('players', dateFormat + ': New game created by ' + data.game.creatorUsername);
                });
                client.on('join_game', function (data) {
                    var gameDeck = data.game.baralho;
                    var hand = [];
                    var turn;
                    var player;
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
                    var playerGame = new Game(data.user._id, data.game._id, hand, turn, player, gameDeck.trunfo);
                    client.player.games.push(playerGame);
                    client.join(data.game._id);
                    _this.io.emit('join_game', data);
                    var date = new Date();
                    var dateFormat = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.broadcast.emit('players', dateFormat + ': ' + data.game.creatorUsername + ' joinned game ' + data.game._id);
                });
                client.on('start_game', function (game) {
                    _this.io.to(game._id).emit('start_game', game._id);
                });
                client.on('playing_game', function (game) {
                    var playerGames = client.player.games;
                    //console.log(playerGames);
                    playerGames.forEach(function (pGame) {
                        if (pGame.gameId == game) {
                            _this.io.to(game).emit('playing_game', pGame);
                        }
                    });
                });
                client.on('play_card', function (data) {
                    var playerGames = client.player.games;
                    var play = data.play;
                    var hand = [];
                    var playedCard;
                    playerGames.forEach(function (pGame) {
                        if (pGame.gameId == data.game && pGame.playerId == data.play.playerId) {
                            pGame.playerHand.forEach(function (card) {
                                if (card.imagePath == play.playedCard.imagePath) {
                                    card.jogada = 'played';
                                    playedCard = card;
                                }
                            });
                            hand = pGame.playerHand;
                        }
                    });
                    //console.log(hand);
                    //console.log(playedCard);
                    _this.io.to(data.game).emit('play_card', { hand: hand, play: play, playedCard: playedCard });
                });
                client.on('played_round', function (data) {
                    var plays = data.plays;
                    var games = client.player.games;
                    var assist;
                    var gameId;
                    var winningPlay;
                    var winningPoints = 0;
                    var winnigPlayerNumber;
                    console.log(plays);
                    plays.forEach(function (play) {
                        if (winningPlay == undefined) {
                            winningPlay = play;
                            assist = play.naipe;
                            gameId = play.gameId;
                        }
                        else {
                            if (play.playedCard.naipe == assist) {
                                if (winningPlay.playedCard.pontos < play.playedCard.pontos) {
                                    winningPlay = play;
                                    console.log('vim aos  pontos');
                                }
                            }
                            else {
                                games.forEach(function (game) {
                                    if (game.gameId == gameId && game.playerId == play.playerId) {
                                        game.playerHand.forEach(function (card) {
                                            if (card.jogada != 'played' && card.naipe == assist) {
                                                game.renuncia = true;
                                                console.log('vim a renuncia');
                                            }
                                        });
                                    }
                                });
                                if (play.playedCard.naipe == data.trunfo) {
                                    console.log('vim ao trunfo');
                                    if (winningPlay.playedCard.naipe != data.trunfo) {
                                        winningPlay = play;
                                        console.log('vim ao um trunfo');
                                    }
                                    else {
                                        if (winningPlay.playedCard.pontos < play.playedCard.pontos) {
                                            winningPlay = play;
                                            console.log('vim ao segundo trunfo');
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
                    games.forEach(function (game) {
                        if (game.gameId == gameId) {
                            if (game.playerId == winningPlay.playerId) {
                                game.points += winningPoints;
                                winnigPlayerNumber = game.playerNumber;
                            }
                        }
                    });
                    games.forEach(function (game) {
                        if (game.gameId == gameId) {
                            if (game.playerNumber == 1) {
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
                            _this.io.to(gameId).emit('played_round', game);
                        }
                    });
                });
                client.emit('players', Date.now() + ': Welcome to Sueca');
                client.broadcast.emit('players', Date.now() + ': A new player has arrived');
                client.on('chat', function (data) { return _this.io.emit('chat', data); });
                client.on('chat-lobby', function (data) { return _this.io.emit('chat', data); });
                client.on('chat-game', function (data) { return _this.io.to(data.game).emit('chat-game', data.message); });
            });
        };
        this.notifyAll = function (channel, message) {
            _this.io.sockets.emit(channel, message);
        };
    }
    return WebSocketServer;
}());
exports.WebSocketServer = WebSocketServer;
;
