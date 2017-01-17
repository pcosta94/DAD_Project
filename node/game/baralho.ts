import { Carta } from "./carta";

import { Naipe } from "./naipe";
import { TipoCarta } from "./tipoCarta";

export class Baralho {

	public baralho: Carta[];

	public constructor(){
		this.baralho = this.adicionarCartas();
		this.baralhar();
	}

	public adicionarCartas(): Carta[] {
		let baralho: Carta[];
		let naipe;
		let tipo;

		for (let n in Naipe){
			naipe = n;
			for (let t in TipoCarta){
				tipo = t;
				let carta: Carta = new Carta (naipe,tipo);
				baralho.push(carta);
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

	public getBaralho(): Carta[]{
		return this.baralho;
	}
}