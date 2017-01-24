import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SuecaService } from '../sueca.service';
import { Router } from '@angular/router';
import { Baralho } from './baralho';

@Component({
	moduleId: module.id,
	selector: 'game',
	templateUrl: 'game.component.html'
})

export class GameComponent implements OnInit {
	public adversarios: any[] = [];
	public parceiro: any[] = [];
	public maoDeCartas: any[] = [];
	public pontosGanhos: number;

	constructor(private authService: AuthService, 
				private suecaService: SuecaService, 
				private router: Router) {}

	ngOnInit() {

		//this.suecaService.getMao().subscribe((m:any) => this.maoDeCartas = m);

		let baralho: Baralho = new Baralho();
		//this.maoDeCartas = baralho.primeiraMao;
		console.log(this.maoDeCartas);
		// 	this.maos = new Maos();
		// 	this.trunfo = this.trunfo;
		// 	this.pMao = this.maos.primeiraMao;
		// 	this.sMao = this.maos.segundaMao;
		// 	this.tMao = this.maos.terceiraMao;
		// 	this.qMao = this.maos.quartaMao;

		// 	console.log(Naipe.Copas);
		// 	this.carta = new Carta(Naipe.Copas,TipoCarta.As);

		// 	this.image = this.carta.imagePath;
		// 	console.log(this.carta);
	}

	
}