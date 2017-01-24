"use strict";
var baralho_1 = require("./baralho");
var Maos = (function () {
    function Maos() {
        this.baralho = new baralho_1.Baralho();
        this.distribuirCartas(this.baralho);
        this.trunfo = this.primeiraMao[0].naipe;
    }
    Maos.prototype.distribuirCartas = function (baralho) {
        var cartas = baralho.getBaralho();
        this.primeiraMao = cartas.slice(0, 10);
        this.segundaMao = cartas.slice(10, 20);
        this.terceiraMao = cartas.slice(20, 30);
        this.quartaMao = cartas.slice(30, 40);
    };
    return Maos;
}());
exports.Maos = Maos;
