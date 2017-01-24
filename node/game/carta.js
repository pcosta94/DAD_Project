"use strict";
var tipoCarta_1 = require("./tipoCarta");
var Carta = (function () {
    function Carta(naipe, tipo) {
        this.naipe = naipe;
        this.tipo = tipo;
        this.pontos = this.atribuirPontos(tipo);
    }
    Carta.prototype.atribuirPontos = function (tipo) {
        var pontos = 0;
        switch (tipo) {
            case tipoCarta_1.TipoCarta.As:
                pontos = 11;
                break;
            case tipoCarta_1.TipoCarta.Sete:
                pontos = 10;
                break;
            case tipoCarta_1.TipoCarta.Rei:
                pontos = 4;
                break;
            case tipoCarta_1.TipoCarta.Valete:
                pontos = 3;
                break;
            case tipoCarta_1.TipoCarta.Rainha:
                pontos = 2;
                break;
            default:
                pontos = 0;
                break;
        }
        return pontos;
    };
    return Carta;
}());
exports.Carta = Carta;
