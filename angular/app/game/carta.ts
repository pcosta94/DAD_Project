import { Naipe } from "./naipe";
import { TipoCarta } from "./tipo-carta";


export class Carta {
	public tipo: TipoCarta;
	public naipe: Naipe;
	public pontos: number;
	public imagePath: string;

	public constructor(naipe: any, tipo: any){
		this.naipe = naipe;
		this.tipo = tipo;
		this.pontos = this.atribuirPontos(this.tipo);
		this.imagePath = this.atribuirImagem(this.naipe,this.tipo);

	}

	public atribuirPontos(tipo: TipoCarta): number{

		switch (tipo) {
			case TipoCarta.As: return 11;
			case TipoCarta.Sete: return 10;
			case TipoCarta.Rei: return 4;
			case TipoCarta.Valete: return 3;
			case TipoCarta.Rainha: return 2;
			default: return 0;
		}
	}

	public atribuirImagem(naipe: Naipe, tipo: TipoCarta): string{
	
		if(naipe == Naipe.Copas){
			switch (tipo) {
				case TipoCarta.As: return "cards/c1.png";
				case TipoCarta.Dois: return "cards/c2.png";
				case TipoCarta.Tres: return "cards/c3.png";
				case TipoCarta.Quatro: return "cards/c4.png";
				case TipoCarta.Cinco: return "cards/c5.png";
				case TipoCarta.Seis: return "cards/c6.png";
				case TipoCarta.Sete: return "cards/c7.png";
				case TipoCarta.Valete: return "cards/cV.png";
				case TipoCarta.Rainha: return "cards/cD.png";
				case TipoCarta.Rei: return "cards/cR.png";
			}
		}

		if(naipe == Naipe.Ouros){
			switch (tipo) {
				case TipoCarta.As: return "cards/o1.png";
				case TipoCarta.Dois: return "cards/o2.png";
				case TipoCarta.Tres: return "cards/o3.png";
				case TipoCarta.Quatro: return "cards/o4.png";
				case TipoCarta.Cinco: return "cards/o5.png";
				case TipoCarta.Seis: return "cards/o6.png";
				case TipoCarta.Sete: return "cards/o7.png";
				case TipoCarta.Valete: return "cards/oV.png";
				case TipoCarta.Rainha: return "cards/oD.png";
				case TipoCarta.Rei: return "cards/oR.png";
			}
		}

		if(naipe == Naipe.Espadas){
			switch (tipo) {
				case TipoCarta.As: return "cards/e1.png";
				case TipoCarta.Dois: return "cards/e2.png";
				case TipoCarta.Tres: return "cards/e3.png";
				case TipoCarta.Quatro: return "cards/e4.png";
				case TipoCarta.Cinco: return "cards/e5.png";
				case TipoCarta.Seis: return "cards/e6.png";
				case TipoCarta.Sete: return "cards/e7.png";
				case TipoCarta.Valete: return "cards/eV.png";
				case TipoCarta.Rainha: return "cards/eD.png";
				case TipoCarta.Rei: return "cards/eR.png";
			}
		}

		if(naipe == Naipe.Paus){
			switch (tipo) {
				case TipoCarta.As: return "cards/p1.png";
				case TipoCarta.Dois: return "cards/p2.png";
				case TipoCarta.Tres: return "cards/p3.png";
				case TipoCarta.Quatro: return "cards/p4.png";
				case TipoCarta.Cinco: return "cards/p5.png";
				case TipoCarta.Seis: return "cards/p6.png";
				case TipoCarta.Sete: return "cards/p7.png";
				case TipoCarta.Valete: return "cards/pV.png";
				case TipoCarta.Rainha: return "cards/pD.png";
				case TipoCarta.Rei: return "cards/pR.png";
			}
		}

	}

}