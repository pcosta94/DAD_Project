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
    function Game(player_id, game_id, playerHand, playOrder) {
        this.points = 0;
        this.playerId = player_id;
        this.gameId = game_id;
        this.playerHand = playerHand;
        this.playOrder = playOrder;
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
                    var order;
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
                    var playerGame = new Game(data.user._id, data.game._id, hand, order);
                    client.player.games.push(playerGame);
                    client.join(data.game._id);
                    client.broadcast.emit('new_game', data.game);
                    client.broadcast.emit('players', Date.now() + ': New game created by ' + data.game.creatorUsername);
                });
                client.on('join_game', function (data) {
                    var gameDeck = data.game.baralho;
                    var hand = [];
                    var order;
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
                    var playerGame = new Game(data.user._id, data.game._id, hand, order);
                    client.player.games.push(playerGame);
                    //console.log(client.player.games[data.game._id]);
                    client.join(data.game._id);
                    _this.io.emit('update_game', 'User joinned game');
                });
                client.on('start_game', function (game) {
                    //console.log(client.player.games);
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
                    _this.io.to(data.game).emit('play_card', data);
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
