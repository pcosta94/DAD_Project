import { Baralho } from "./baralho";
import { Carta } from "./carta";
import { Naipe } from "./naipe";

export class Maos{

	public baralho: Baralho;
	public trunfo: Naipe;
	public primeiraMao: Carta[];
	public segundaMao: Carta[];
	public terceiraMao: Carta[];
	public quartaMao: Carta[];

	public constructor(){
		this.baralho = new Baralho();
		this.distribuirCartas(this.baralho);
		this.trunfo = this.primeiraMao[0].naipe;
	}

	public distribuirCartas(baralho: Baralho){
		let cartas: Carta[] = baralho.getBaralho();

		this.primeiraMao = cartas.slice(0,10);

		this.segundaMao = cartas.slice(10,20);

		this.terceiraMao = cartas.slice(20,30);

		this.quartaMao = cartas.slice(30,40);
		
	}


}