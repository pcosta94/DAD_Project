import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SuecaService } from '../sueca.service';
import { ActivatedRoute } from '@angular/router';
import { Baralho } from './baralho';
import { Game } from  './game';
import { GameChatComponent } from './game-chat.component';


@Component({
	moduleId: module.id,
	selector: 'game',
	templateUrl: 'game.component.html'
})

export class GameComponent implements OnInit {
	public myPoints: number;
	public gameId: any;
	public playingGame: any[] = [];
	public team1: string[];
	public team2: string[];
	public myDeck: any[] = [];
	public jogada: any[] = [];
	public isMyTurn: boolean = false;

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
				this.playingGame.push(m);

		});

		this.setGameAtributes(this.playingGame);
		
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

	setGameAtributes(games: any){
		console.log(games);
		//let baralho: any = game.baralho;
		//this.team1.push(game[0].players[0].username);
		//this.team1.push(game[0].players[1].username);
		//this.team2.push(game[0].players[2].username);
		//this.team2.push(game[0].players[3].username);
		//if(game[0].players[0]._id == this.authService.currentUser._id){
			
		//}
	}

	playCard(card: any){
		
	}
	
}