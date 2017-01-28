import { Carta } from "./carta";

import { Naipe } from "./naipe";
import { TipoCarta } from "./tipo-carta";

export class Baralho {

	public baralho: Carta[];
	public trunfo: Naipe;
	public pMao: Carta[];
	public sMao: Carta[];
	public tMao: Carta[];
	public qMao: Carta[];
	public maosDistribuidas: number = 0;

	public constructor(){
		this.baralho = this.adicionarCartas();
		this.baralhar();
		this.trunfo = this.baralho[0].naipe;
		this.distribuirMaos(this.baralho);
	}

	public adicionarCartas(): Carta[] {
		let baralho: Carta[] = [];
		let naipe: any;
		let tipo: any;
		let carta: any;
		let naiper: Naipe;
		
		for (let n in Naipe){
			if (isNaN(Number(n))) {
				naipe = n;
				for (let t in TipoCarta){
					if(isNaN(Number(t))) {
						tipo = t;
						carta = new Carta (Naipe[naipe],TipoCarta[tipo]);
						baralho.push(carta);
					}
				}
			}						
		}

		return baralho;
	}

	public baralhar(){
		let counter = this.baralho.length;

		while( counter > 0){
			let index = Math.floor(Math.random() * counter);

			counter --;

			let temp = this.baralho[counter];
			this.baralho[counter] = this.baralho[index];
			this.baralho[index] = temp;
		}
	}

	public distribuirMaos(baralho: Carta[]){
		let cartas: Carta[] = baralho;
		this.pMao = cartas.slice(0,10);
		this.sMao = cartas.slice(10,20);
		this.tMao = cartas.slice(20,30);
		this.qMao = cartas.slice(30,40); 
	}

	public atribuirMao(): Carta[]{
		if(this.maosDistribuidas == 0){
			this.maosDistribuidas++;
			return this.pMao;
		}
		if(this.maosDistribuidas == 2){
			this.maosDistribuidas++;
			return this.sMao;
		}
		if(this.maosDistribuidas == 1){
			this.maosDistribuidas++;
			return this.tMao;
		}
		if(this.maosDistribuidas == 3){
			this.maosDistribuidas++;
			return this.qMao;
		}
	}

}