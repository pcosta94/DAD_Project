System.register(["./tabuleiro", "./navio", "./celula", "./posicao"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tabuleiro_1, navio_1, celula_1, posicao_1;
    var tabuleiro;
    function limparTabuleiro() {
        document.getElementById('msgerro').innerText = '';
        tabuleiro = new tabuleiro_1.Tabuleiro();
        desenhaTabuleiro();
    }
    function addNavio() {
        document.getElementById('msgerro').innerText = '';
        try {
            var tipo = document.getElementById('tiponavio').value;
            var orient = document.getElementById('orientacao').value;
            var linha = document.getElementById('linha').value;
            if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].indexOf(linha) < 0) {
                throw Error("Linha Inválida");
            }
            var coluna = document.getElementById('coluna').value;
            var tipoNavio = navio_1.TipoNavio.PortaAvioes;
            switch (tipo) {
                case "1":
                    tipoNavio = navio_1.TipoNavio.Couracado;
                    break;
                case "2":
                    tipoNavio = navio_1.TipoNavio.Cruzador;
                    break;
                case "3":
                    tipoNavio = navio_1.TipoNavio.ContraTorpedeiro;
                    break;
                case "4":
                    tipoNavio = navio_1.TipoNavio.Submarino;
                    break;
            }
            var orientacao = navio_1.Orientacao.Normal;
            switch (orient) {
                case "1":
                    orientacao = navio_1.Orientacao.Roda90;
                    break;
                case "2":
                    orientacao = navio_1.Orientacao.Roda180;
                    break;
                case "3":
                    orientacao = navio_1.Orientacao.Roda270;
                    break;
            }
            var col = +coluna;
            tabuleiro.adicionaNavio(tipoNavio, orientacao, linha, col);
            desenhaTabuleiro();
        }
        catch (e) {
            document.getElementById('msgerro').innerText = e;
        }
    }
    function desenhaTabuleiro() {
        document.getElementById('msgerro').innerText = '';
        try {
            document.getElementById('tabela').innerHTML = "";
            var plainHtml_1 = "";
            tabuleiro_1.Tabuleiro.todasLinhas().forEach(function (linha) {
                plainHtml_1 += "<tr><td>" + linha + "</td>";
                tabuleiro_1.Tabuleiro.todasColunas().forEach(function (coluna) {
                    if (tabuleiro.getCelula(linha, coluna).tipo == celula_1.TipoCelula.Navio)
                        plainHtml_1 += "<td>X</td>";
                    else if (posicao_1.Posicao.existe(new posicao_1.Posicao(linha, coluna), tabuleiro.posicoesOcupadas))
                        plainHtml_1 += "<td>.</td>";
                    else
                        plainHtml_1 += "<td>&nbsp</td>";
                });
                plainHtml_1 += "</tr>";
            });
            plainHtml_1 += "<tr><td></td>";
            tabuleiro_1.Tabuleiro.todasColunas().forEach(function (coluna) {
                plainHtml_1 += "<td>" + coluna + "</td>";
            });
            plainHtml_1 += "</tr>";
            document.getElementById('tabela').innerHTML = plainHtml_1;
            plainHtml_1 = "";
            document.getElementById('listanavios').innerHTML = "";
            tabuleiro.navios.forEach(function (navio) {
                plainHtml_1 += "<li>" + navio.posicao.strValue() + " Tipo=" + navio.tipoNavio + ", Orientação=" + navio.orientacao + "</li>";
            });
            document.getElementById('listanavios').innerHTML = plainHtml_1;
        }
        catch (e) {
            document.getElementById('msgerro').innerText = e;
        }
    }
    return {
        setters:[
            function (tabuleiro_1_1) {
                tabuleiro_1 = tabuleiro_1_1;
            },
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
            tabuleiro = new tabuleiro_1.Tabuleiro();
            desenhaTabuleiro();
            document.getElementById('add').addEventListener('click', function (ev) { return addNavio(); });
            document.getElementById('limpar').addEventListener('click', function (ev) { return limparTabuleiro(); });
            document.getElementById('msgerro').innerText = '';
        }
    }
});
//# sourceMappingURL=main.js.map