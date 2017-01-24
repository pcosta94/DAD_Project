"use strict";
var carta_1 = require("./carta");
var naipe_1 = require("./naipe");
var tipoCarta_1 = require("./tipoCarta");
var Baralho = (function () {
    function Baralho() {
        this.baralho = this.adicionarCartas();
        this.baralhar();
    }
    Baralho.prototype.adicionarCartas = function () {
        var baralho;
        var naipe;
        var tipo;
        for (var n in naipe_1.Naipe) {
            naipe = n;
            for (var t in tipoCarta_1.TipoCarta) {
                tipo = t;
                var carta = new carta_1.Carta(naipe, tipo);
                baralho.push(carta);
            }
        }
        return baralho;
    };
    Baralho.prototype.baralhar = function () {
        var counter = this.baralho.length;
        while (counter > 0) {
            var index = Math.floor(Math.random() * counter);
            counter--;
            var temp = this.baralho[counter];
            this.baralho[counter] = this.baralho[index];
            this.baralho[index] = temp;
        }
    };
    Baralho.prototype.getBaralho = function () {
        return this.baralho;
    };
    return Baralho;
}());
exports.Baralho = Baralho;
