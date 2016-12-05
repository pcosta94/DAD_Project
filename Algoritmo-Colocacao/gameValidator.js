System.register(["./tabuleiro", "./navio"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tabuleiro_1, navio_1, navio_2;
    var GameValidator;
    return {
        setters:[
            function (tabuleiro_1_1) {
                tabuleiro_1 = tabuleiro_1_1;
            },
            function (navio_1_1) {
                navio_1 = navio_1_1;
                navio_2 = navio_1_1;
            }],
        execute: function() {
            GameValidator = (function () {
                function GameValidator() {
                }
                GameValidator.verificaColuna = function (coluna) {
                    if ((coluna < 1) || (coluna > 10)) {
                        return false;
                    }
                    return true;
                };
                GameValidator.verificaLinha = function (linha) {
                    return tabuleiro_1.Tabuleiro.todasLinhas().indexOf(linha) > -1;
                };
                GameValidator.verificaOrientacao = function (tipo, orientacao) {
                    switch (tipo) {
                        case navio_1.TipoNavio.PortaAvioes:
                            return true;
                        case navio_1.TipoNavio.Couracado:
                        case navio_1.TipoNavio.Cruzador:
                        case navio_1.TipoNavio.ContraTorpedeiro:
                            return (orientacao == navio_2.Orientacao.Normal) || (orientacao == navio_2.Orientacao.Roda90);
                        case navio_1.TipoNavio.Submarino:
                            return (orientacao == navio_2.Orientacao.Normal);
                    }
                };
                GameValidator.verificaLimites = function (tipo, orientacao, posicao) {
                    console.log('VERIFICA LIMITES');
                    console.log('Tipo = ' + tipo);
                    console.log('Orientacao = ' + orientacao);
                    console.log(typeof posicao.coluna);
                    console.log('Posicao = ' + posicao.strValue());
                    if (tipo == navio_1.TipoNavio.Submarino) {
                        return true;
                    }
                    var offsetVertical = 0;
                    var offsetHorizontal = 0;
                    switch (orientacao) {
                        case navio_2.Orientacao.Normal:
                            switch (tipo) {
                                case navio_1.TipoNavio.PortaAvioes:
                                    offsetVertical = 2;
                                    offsetHorizontal = 2;
                                    break;
                                case navio_1.TipoNavio.Couracado:
                                    offsetHorizontal = 3;
                                    break;
                                case navio_1.TipoNavio.Cruzador:
                                    offsetHorizontal = 2;
                                    break;
                                case navio_1.TipoNavio.ContraTorpedeiro:
                                    offsetHorizontal = 1;
                                    break;
                            }
                            break;
                        case navio_2.Orientacao.Roda90:
                            switch (tipo) {
                                case navio_1.TipoNavio.PortaAvioes:
                                    offsetVertical = 2;
                                    offsetHorizontal = -2;
                                    break;
                                case navio_1.TipoNavio.Couracado:
                                    offsetVertical = 3;
                                    break;
                                case navio_1.TipoNavio.Cruzador:
                                    offsetVertical = 2;
                                    break;
                                case navio_1.TipoNavio.ContraTorpedeiro:
                                    offsetVertical = 1;
                                    break;
                            }
                            break;
                        case navio_2.Orientacao.Roda180:
                            if (tipo === navio_1.TipoNavio.PortaAvioes) {
                                offsetVertical = -2;
                                offsetHorizontal = -2;
                            }
                            else {
                                return false;
                            }
                            break;
                        case navio_2.Orientacao.Roda270:
                            if (tipo === navio_1.TipoNavio.PortaAvioes) {
                                offsetVertical = -2;
                                offsetHorizontal = 2;
                            }
                            else {
                                return false;
                            }
                    }
                    console.log("posicao.coluna");
                    console.log(posicao.coluna);
                    console.log(typeof posicao.coluna);
                    console.log("offsetHorizontal");
                    console.log(offsetHorizontal);
                    console.log(typeof offsetHorizontal);
                    console.log(posicao.coluna + offsetHorizontal);
                    if (((posicao.coluna + offsetHorizontal) < 1) || ((posicao.coluna + offsetHorizontal) > 10)) {
                        return false;
                    }
                    console.log("posicao.linhaAsNumber()");
                    console.log(posicao.linhaAsNumber());
                    console.log("offsetVertical");
                    console.log(offsetVertical);
                    if (((posicao.linhaAsNumber() + offsetVertical) < 1) || ((posicao.linhaAsNumber() + offsetVertical) > 10)) {
                        return false;
                    }
                    return true;
                };
                return GameValidator;
            }());
            exports_1("GameValidator", GameValidator);
        }
    }
});
//# sourceMappingURL=gameValidator.js.map