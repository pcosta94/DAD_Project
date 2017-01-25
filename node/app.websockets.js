"use strict";
var io = require('socket.io');
var baralho_1 = require("../angular/app/game/baralho");
var game_1 = require("../angular/app/game/game");
var Player = (function () {
    function Player() {
        this.username = '';
        this.games = {};
    }
    return Player;
}());
exports.Player = Player;
var WebSocketServer = (function () {
    function WebSocketServer() {
        var _this = this;
        this.games = [];
        this.init = function (server) {
            _this.io = io.listen(server);
            _this.io.sockets.on('connection', function (client) {
                client.player = new Player();
                client.on('new_game', function (game) {
                    var baralho = new baralho_1.Baralho();
                    _this.games[game._id] = new game_1.Game(game._id, game.creatorUsername, game.state, 0, 0, {}, baralho, game.players);
                    var playerGame = {
                        gameId: game._id,
                        mao: baralho.atribuirMao(),
                        pontos: 0,
                        renuncia: false,
                    };
                    client.player.games[game._id] = playerGame;
                    client.join(game._id);
                    client.broadcast.emit('new_game', game);
                    client.broadcast.emit('palyers', Date.now() + ': New game created by' + game.ceartorUsername);
                });
                client.on('join_game', function (data) {
                    var baralho = _this.games[data.game._id].baralho;
                    _this.games[data.game._id].players.push(data.player);
                    var playerGame = {
                        gameId: data.game._id,
                        mao: baralho.atribuirMao(),
                        pontos: 0,
                        renuncia: false,
                    };
                    client.player.games[data.game._id] = playerGame;
                    client.join(data.game._id);
                    _this.io.emit('update_game', 'User joinned game');
                });
                client.on('start_game', function (game) {
                    _this.games[game._id].state = game.state;
                    _this.games[game._id].gameStart = Date.now();
                    _this.io.to(game._id).emit('start_game', _this.games[game._id]);
                });
                client.on('delete_game', function (data) {
                    _this.io.emit('delete_game', 'Game deleted!');
                });
                client.emit('players', Date.now() + ': Welcome to Sueca');
                client.broadcast.emit('players', Date.now() + ': A new player has arrived');
                client.on('chat', function (data) { return _this.io.emit('chat', data); });
                client.on('chat-lobby', function (data) { return _this.io.emit('chat', data); });
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
