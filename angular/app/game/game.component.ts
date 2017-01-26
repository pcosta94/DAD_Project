import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SuecaService } from '../sueca.service';
import { ActivatedRoute } from '@angular/router';
import { Baralho } from './baralho';
import { Game } from  './game';


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
	public gameId: any;
	public playingGame: any;

	constructor(private authService: AuthService, 
				private suecaService: SuecaService, 
				private router: ActivatedRoute) {}

	ngOnInit() {

		//this.suecaService.getMao().subscribe((m:any) => this.maoDeCartas = m);
		this.router.params.subscribe((m: any) =>{
			this.gameId = m.id;
		});
		
		this.suecaService.sendGetPlayingGame(this.gameId);

		this.suecaService.getGame().subscribe((m: any) => {
			console.log(m);
			this.playingGame = m;
		});

		//this.maoDeCartas = baralho.primeiraMao;
		console.log(this.playingGame);
		console.log(this.gameId);

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