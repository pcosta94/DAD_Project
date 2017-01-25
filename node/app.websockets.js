"use strict";
var io = require('socket.io');
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
        this.init = function (server) {
            _this.io = io.listen(server);
            _this.io.sockets.on('connection', function (client) {
                client.player = new Player();
                client.on('new_game', function (game) {
                    var newGame = {
                        mao: game.baralho.pMao,
                        pontos: 0,
                        renuncia: false,
                    };
                    client.player.username = game.players[0].player.username;
                    client.player.games[game._id] = newGame;
                    client.join(game._id);
                    client.broadcast.emit('new_game', game);
                    console.log(game._id);
                    client.broadcast.emit('palyers', Date.now() + ': New game created by' + game.ceartorUsername);
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
