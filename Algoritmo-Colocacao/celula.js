System.register(["./posicao"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var posicao_1;
    var TipoCelula, Celula;
    return {
        setters:[
            function (posicao_1_1) {
                posicao_1 = posicao_1_1;
            }],
        execute: function() {
            (function (TipoCelula) {
                TipoCelula[TipoCelula["Mar"] = 0] = "Mar";
                TipoCelula[TipoCelula["Navio"] = 1] = "Navio";
            })(TipoCelula || (TipoCelula = {}));
            exports_1("TipoCelula", TipoCelula);
            Celula = (function () {
                function Celula(linha, coluna) {
                    this.posicao = new posicao_1.Posicao(linha, coluna);
                    this.tipo = TipoCelula.Mar;
                    this.tiro = false;
                    this.pertenceA = null;
                }
                Celula.prototype.sobreposicao = function (c) {
                    return (c.posicao.linha == this.posicao.linha) && (c.posicao.coluna == this.posicao.coluna);
                };
                Celula.existe = function (celula, arrayCelulas) {
                    for (var i = 0; i < arrayCelulas.length; i++) {
                        if (celula.sobreposicao(arrayCelulas[i])) {
                            return true;
                        }
                    }
                    return false;
                };
                return Celula;
            }());
            exports_1("Celula", Celula);
        }
    }
});
//# sourceMappingURL=celula.js.map