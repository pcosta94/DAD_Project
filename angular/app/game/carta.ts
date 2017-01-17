import { Naipe } from "./naipe";
import { TipoCarta } from "./tipoCarta";


export class Carta {
	public tipo:TipoCarta;
	public naipe:Naipe;
	public pontos: number;

	public constructor(naipe: Naipe, tipo: TipoCarta){
		this.naipe = naipe;
		this.tipo = tipo;
		this.pontos = this.atribuirPontos(tipo);
	}

	public atribuirPontos(tipo: TipoCarta): number{
		let pontos: number = 0;

		switch (tipo) {
			case TipoCarta.As:
				pontos = 11;
				break;
			case TipoCarta.Sete:
				pontos = 10;
				break;
			case TipoCarta.Rei:
				pontos = 4;
				break;
			case TipoCarta.Valete:
				pontos = 3;
				break;
			case TipoCarta.Rainha:
				pontos = 2;
				break;
			default:
				pontos = 0;
				break;
		}

		return pontos;
	}



}