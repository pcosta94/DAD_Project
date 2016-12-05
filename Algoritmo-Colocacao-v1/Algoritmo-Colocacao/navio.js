System.register(["./gameValidator", "./celula", "./posicao"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var gameValidator_1, celula_1, posicao_1;
    var TipoNavio, Orientacao, Navio;
    return {
        setters:[
            function (gameValidator_1_1) {
                gameValidator_1 = gameValidator_1_1;
            },
            function (celula_1_1) {
                celula_1 = celula_1_1;
            },
            function (posicao_1_1) {
                posicao_1 = posicao_1_1;
            }],
        execute: function() {
            (function (TipoNavio) {
                TipoNavio[TipoNavio["PortaAvioes"] = 0] = "PortaAvioes";
                TipoNavio[TipoNavio["Couracado"] = 1] = "Couracado";
                TipoNavio[TipoNavio["Cruzador"] = 2] = "Cruzador";
                TipoNavio[TipoNavio["ContraTorpedeiro"] = 3] = "ContraTorpedeiro";
                TipoNavio[TipoNavio["Submarino"] = 4] = "Submarino";
            })(TipoNavio || (TipoNavio = {}));
            exports_1("TipoNavio", TipoNavio);
            (function (Orientacao) {
                Orientacao[Orientacao["Normal"] = 0] = "Normal";
                Orientacao[Orientacao["Roda90"] = 1] = "Roda90";
                Orientacao[Orientacao["Roda180"] = 2] = "Roda180";
                Orientacao[Orientacao["Roda270"] = 3] = "Roda270";
            })(Orientacao || (Orientacao = {}));
            exports_1("Orientacao", Orientacao);
            Navio = (function () {
                function Navio(tipo, orientacao, linha, coluna) {
                    if (!gameValidator_1.GameValidator.verificaOrientacao(tipo, orientacao)) {
                        throw new Error('A orientação "' + orientacao + '" é inválida para os navios do tipo  "' + tipo + '".');
                    }
                    this.posicao = new posicao_1.Posicao(linha, coluna);
                    if (!gameValidator_1.GameValidator.verificaLimites(tipo, orientacao, this.posicao)) {
                        throw new Error('O tipo de navio "' + tipo + '" na posição (' + linha + coluna + ') e orientação "' + orientacao + '" não cabe nos limites do tabuleiro');
                    }
                    this.tipoNavio = tipo;
                    this.orientacao = orientacao;
                    this.celulas = [];
                    this.posicoesOcupadas = this.calculaPosicoesOcupadas();
                    this.preenchePosicoesVizinhas();
                }
                Navio.prototype.addCelula = function (celula) {
                    if (!posicao_1.Posicao.existe(celula.posicao, this.posicoesOcupadas)) {
                        throw new Error('Não é possível adicionar a célula ao navio.');
                    }
                    if (celula_1.Celula.existe(celula, this.celulas)) {
                        throw new Error('Não é possível adicionar a célula ao navio, porque já existe uma célula na mesma posição.');
                    }
                    if (celula.pertenceA != null) {
                        throw new Error('Não é possível adicionar a célula ao navio, porque já está associada a outro navio.');
                    }
                    celula.pertenceA = this;
                    celula.tipo = celula_1.TipoCelula.Navio;
                    this.celulas.push(celula);
                };
                Navio.prototype.totalTiros = function () {
                    var total = 0;
                    this.celulas.forEach(function (value) {
                        value.tiro ? total++ : null;
                    });
                    return total;
                };
                Navio.prototype.afundou = function () {
                    return this.totalTiros() == Navio.totalCelulasPorTipoNavio(this.tipoNavio);
                };
                Navio.totalCelulasPorTipoNavio = function (tipo) {
                    switch (tipo) {
                        case TipoNavio.PortaAvioes: return 5;
                        case TipoNavio.Couracado: return 4;
                        case TipoNavio.Cruzador: return 3;
                        case TipoNavio.ContraTorpedeiro: return 2;
                        case TipoNavio.Submarino: return 1;
                    }
                    return 0;
                };
                Navio.prototype.calculaPosicoesOcupadas = function () {
                    if (this.tipoNavio == TipoNavio.Submarino) {
                        return [new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna)];
                    }
                    switch (this.orientacao) {
                        case Orientacao.Normal:
                            switch (this.tipoNavio) {
                                case TipoNavio.ContraTorpedeiro:
                                    return [
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna + 1)
                                    ];
                                case TipoNavio.Cruzador:
                                    return [
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna + 1),
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna + 2)
                                    ];
                                case TipoNavio.Couracado:
                                    return [
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna + 1),
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna + 2),
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna + 3)
                                    ];
                                case TipoNavio.PortaAvioes:
                                    return [
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna + 1),
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna + 2),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 1, this.posicao.coluna + 1),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 2, this.posicao.coluna + 1),
                                    ];
                            }
                            break;
                        case Orientacao.Roda90:
                            switch (this.tipoNavio) {
                                case TipoNavio.ContraTorpedeiro:
                                    return [
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 1, this.posicao.coluna)
                                    ];
                                case TipoNavio.Cruzador:
                                    return [
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 1, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 2, this.posicao.coluna)
                                    ];
                                case TipoNavio.Couracado:
                                    return [
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 1, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 2, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 3, this.posicao.coluna)
                                    ];
                                case TipoNavio.PortaAvioes:
                                    return [
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 1, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 2, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 1, this.posicao.coluna - 1),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() + 1, this.posicao.coluna - 2),
                                    ];
                            }
                            break;
                        case Orientacao.Roda180:
                            switch (this.tipoNavio) {
                                case TipoNavio.PortaAvioes:
                                    return [
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna - 1),
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna - 2),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() - 1, this.posicao.coluna - 1),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() - 2, this.posicao.coluna - 1),
                                    ];
                            }
                            break;
                        case Orientacao.Roda270:
                            switch (this.tipoNavio) {
                                case TipoNavio.PortaAvioes:
                                    return [
                                        new posicao_1.Posicao(this.posicao.linha, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() - 1, this.posicao.coluna),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() - 1, this.posicao.coluna + 1),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() - 1, this.posicao.coluna + 2),
                                        new posicao_1.Posicao(this.posicao.linhaAsNumber() - 2, this.posicao.coluna),
                                    ];
                            }
                    }
                    throw new Error("Houve um erro ao calcular as posições do navio");
                };
                Navio.prototype.preenchePosicoesVizinhas = function () {
                    var vizinhas = [];
                    this.posicoesOcupadas.forEach(function (p) {
                        var linhaInf = p.linhaAsNumber() - 1;
                        var linhaSup = linhaInf + 2;
                        var colunaInf = p.coluna - 1;
                        var colunaSup = colunaInf + 2;
                        linhaInf = linhaInf < 1 ? 1 : linhaInf;
                        linhaSup = linhaSup > 10 ? 10 : linhaSup;
                        colunaInf = colunaInf < 1 ? 1 : colunaInf;
                        colunaSup = colunaSup > 10 ? 10 : colunaSup;
                        for (var i = linhaInf; i <= linhaSup; i++)
                            for (var j = colunaInf; j <= colunaSup; j++) {
                                vizinhas.push(new posicao_1.Posicao(i, j));
                            }
                    });
                    this.posicoesVizinhas = posicao_1.Posicao.removeRepetidos(vizinhas);
                };
                return Navio;
            }());
            exports_1("Navio", Navio);
        }
    }
});
//# sourceMappingURL=navio.js.map