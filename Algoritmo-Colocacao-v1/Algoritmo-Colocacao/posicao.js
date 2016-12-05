System.register(["./gameValidator"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var gameValidator_1;
    var Posicao;
    return {
        setters:[
            function (gameValidator_1_1) {
                gameValidator_1 = gameValidator_1_1;
            }],
        execute: function() {
            Posicao = (function () {
                function Posicao(linha, coluna) {
                    var linhaLetra;
                    if (typeof linha === "string") {
                        linhaLetra = linha[0];
                    }
                    else {
                        linhaLetra = String.fromCharCode('A'.charCodeAt(0) + linha - 1);
                    }
                    if (!gameValidator_1.GameValidator.verificaColuna(coluna)) {
                        throw new Error('Valor da coluna "' + coluna + '" é inválido');
                    }
                    if (!gameValidator_1.GameValidator.verificaLinha(linhaLetra)) {
                        throw new Error('Valor da linha "' + linhaLetra + '" é inválido');
                    }
                    this.linha = linhaLetra;
                    this.coluna = coluna;
                }
                Posicao.prototype.strValue = function () {
                    return this.linha + this.coluna;
                };
                Posicao.prototype.linhaAsNumber = function () {
                    return this.linha.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
                };
                Posicao.prototype.linhaIndex = function () {
                    return this.linhaAsNumber() - 1;
                };
                Posicao.prototype.colunaIndex = function () {
                    return this.coluna - 1;
                };
                Posicao.prototype.sobreposicao = function (p) {
                    return (p.linha == this.linha) && (p.coluna == this.coluna);
                };
                Posicao.removeRepetidos = function (posicoes) {
                    var result = [];
                    for (var i = 0; i < posicoes.length; i++) {
                        if (!Posicao.existe(posicoes[i], result)) {
                            result.push(posicoes[i]);
                        }
                    }
                    return result;
                };
                Posicao.merge = function (posicoes1, posicoes2) {
                    var result = posicoes1;
                    result = result.concat(posicoes2);
                    return Posicao.removeRepetidos(result);
                };
                Posicao.existe = function (posicao, arrayPosicoes) {
                    for (var i = 0; i < arrayPosicoes.length; i++) {
                        if (posicao.sobreposicao(arrayPosicoes[i])) {
                            return true;
                        }
                    }
                    return false;
                };
                Posicao.conflito = function (arrayPosicoes1, arrayPosicoes2) {
                    for (var i = 0; i < arrayPosicoes1.length; i++) {
                        if (Posicao.existe(arrayPosicoes1[i], arrayPosicoes2)) {
                            return true;
                        }
                    }
                    return false;
                };
                return Posicao;
            }());
            exports_1("Posicao", Posicao);
        }
    }
});
//# sourceMappingURL=posicao.js.map