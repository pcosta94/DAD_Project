System.register(["./navio", "./celula", "./posicao"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var navio_1, celula_1, posicao_1;
    var Tabuleiro;
    return {
        setters:[
            function (navio_1_1) {
                navio_1 = navio_1_1;
            },
            function (celula_1_1) {
                celula_1 = celula_1_1;
            },
            function (posicao_1_1) {
                posicao_1 = posicao_1_1;
            }],
        execute: function() {
            Tabuleiro = (function () {
                function Tabuleiro() {
                    var _this = this;
                    this.celulas = [];
                    this.posicoesOcupadas = [];
                    this.navios = [];
                    Tabuleiro.todasLinhas().forEach(function (letra) {
                        Tabuleiro.todasColunas().forEach(function (coluna) {
                            var c = new celula_1.Celula(letra, coluna);
                            _this.celulas.push(c);
                        });
                    });
                }
                Tabuleiro.prototype.getCelula = function (linha, coluna) {
                    var posicao = new posicao_1.Posicao(linha, coluna);
                    return this.celulas[posicao.linhaIndex() * 10 + posicao.colunaIndex()];
                };
                Tabuleiro.prototype.adicionaNavio = function (tipo, orientacao, linha, coluna) {
                    var _this = this;
                    try {
                        var navio_2 = new navio_1.Navio(tipo, orientacao, linha, coluna);
                        if (posicao_1.Posicao.conflito(navio_2.posicoesOcupadas, this.posicoesOcupadas)) {
                            throw new Error('O navio "' + tipo + '" na posição (' + linha + coluna + ') e orientação "' + orientacao + '" está em sobreposição ou encostado a um navio já existente');
                        }
                        navio_2.posicoesOcupadas.forEach(function (p) {
                            navio_2.addCelula(_this.getCelula(p.linha, p.coluna));
                        });
                        this.posicoesOcupadas = posicao_1.Posicao.merge(this.posicoesOcupadas, navio_2.posicoesVizinhas);
                        this.navios.push(navio_2);
                        return navio_2;
                    }
                    catch (e) {
                        throw e;
                    }
                };
                Tabuleiro.prototype.celulasMatrix = function () {
                    var _this = this;
                    var c = [];
                    Tabuleiro.todasLinhas().forEach(function (linha) {
                        var l = [];
                        Tabuleiro.todasColunas().forEach(function (coluna) {
                            l.push(_this.getCelula(linha, coluna));
                        });
                        c.push(l);
                    });
                    return c;
                };
                Tabuleiro.todasLinhas = function () {
                    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
                };
                Tabuleiro.todasColunas = function () {
                    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                };
                return Tabuleiro;
            }());
            exports_1("Tabuleiro", Tabuleiro);
        }
    }
});
//# sourceMappingURL=tabuleiro.js.map