import {Tabuleiro} from "./tabuleiro";
import {TipoNavio, Orientacao} from "./navio";
import {TipoCelula} from "./celula";
import {Posicao} from "./posicao";


let tabuleiro: Tabuleiro = new Tabuleiro();
desenhaTabuleiro();

document.getElementById('add').addEventListener('click', ev => addNavio());

document.getElementById('limpar').addEventListener('click', ev => limparTabuleiro());

document.getElementById('msgerro').innerText='';

function limparTabuleiro(): void{
    document.getElementById('msgerro').innerText='';
    tabuleiro = new Tabuleiro();
    desenhaTabuleiro();
}

function addNavio(): void{
    document.getElementById('msgerro').innerText='';
    try {
        let tipo = (document.getElementById('tiponavio') as any).value;
        let orient = (document.getElementById('orientacao') as any).value;
        let linha =  (document.getElementById('linha') as any).value;
        if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].indexOf(linha) < 0){
            throw Error("Linha Inválida");
        }

        let coluna =  (document.getElementById('coluna') as any).value;
        let tipoNavio = TipoNavio.PortaAvioes;
        switch (tipo) {
            case "1": tipoNavio = TipoNavio.Couracado;
                 break;
            case "2": tipoNavio = TipoNavio.Cruzador;
                 break;
            case "3": tipoNavio = TipoNavio.ContraTorpedeiro;
                 break;
            case "4": tipoNavio = TipoNavio.Submarino;
                 break;
        }
        let orientacao = Orientacao.Normal;
        switch (orient) {
            case "1": orientacao = Orientacao.Roda90;
                 break;
            case "2": orientacao = Orientacao.Roda180;
                 break;
            case "3": orientacao = Orientacao.Roda270;
                 break;
        }
        // Força cast para numero
        let col : number = +coluna;
        tabuleiro.adicionaNavio(tipoNavio, orientacao, linha, col);
        desenhaTabuleiro();
    } catch (e) {
        document.getElementById('msgerro').innerText=e;
    }
}

function desenhaTabuleiro(): void{
    // Funçaõ não otimizada.  --- SÓ PARA TESTES
    // gera HTML através da concatenação de uma string ?!?!?!!?
    document.getElementById('msgerro').innerText='';
    try {
        document.getElementById('tabela').innerHTML = "";
        let plainHtml = "";
        Tabuleiro.todasLinhas().forEach(linha => {
            plainHtml += "<tr><td>" + linha + "</td>";
            Tabuleiro.todasColunas().forEach(coluna => {
                if (tabuleiro.getCelula(linha, coluna).tipo == TipoCelula.Navio)
                    plainHtml += "<td>X</td>";
                else    
                    if (Posicao.existe(new Posicao(linha, coluna), tabuleiro.posicoesOcupadas))
                        plainHtml += "<td>.</td>";
                    else    
                        plainHtml += "<td>&nbsp</td>";

            });
            plainHtml += "</tr>";
        });
        plainHtml += "<tr><td></td>";
        Tabuleiro.todasColunas().forEach(coluna => {
                plainHtml += "<td>"+coluna+"</td>";
        });
        plainHtml += "</tr>";
        document.getElementById('tabela').innerHTML = plainHtml;


        plainHtml = "";
        document.getElementById('listanavios').innerHTML = "";
        tabuleiro.navios.forEach(navio => {
            plainHtml += "<li>"+navio.posicao.strValue()+" Tipo=" + navio.tipoNavio+ ", Orientação="+ navio.orientacao+"</li>";
        });
        document.getElementById('listanavios').innerHTML = plainHtml;
        
    } catch (e) {
        document.getElementById('msgerro').innerText=e;
    }


}
