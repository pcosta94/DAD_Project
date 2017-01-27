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
	public team1: string[] = [];
	public team2: string[] = [];
	public roundToPlay: number;
	public playerRound: number = 1;
	public cardDeck: Baralho;
	public myDeck: any[] = [];
	public round: any[] = [];
	public isMyTurn: boolean = false;

	constructor(private authService: AuthService, 
				private suecaService: SuecaService, 
				private router: ActivatedRoute) {
		
	}

	ngOnInit() {

		//this.suecaService.getMao().subscribe((m:any) => this.maoDeCartas = m);
		this.router.params.subscribe((m: any) =>{
			this.gameId = m.id;
			this.suecaService.sendGetPlayingGame(this.gameId);
		});
		
		this.suecaService.getGame().subscribe((m: any) => {
				this.playingGame.push(m);
				this.setGameAtributes();
		});

		this.suecaService.getPlayedCard().subscribe((m:any) => {
			this.playerRound = m.round++;
			this.round.push(m.card);
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

	setGameAtributes(){
		if(this.playingGame.length == 1){
			this.cardDeck = this.playingGame[0].baralho;
			this.team1.push(this.playingGame[0].players[0].username);
			this.team1.push(this.playingGame[0].players[1].username);
			this.team2.push(this.playingGame[0].players[2].username);
			this.team2.push(this.playingGame[0].players[3].username);

			if (this.playingGame[0].players[0]._id = this.authService.currentUser._id) {
				this.myDeck = this.cardDeck.pMao;
				this.roundToPlay = 1;
			}
			else if (this.playingGame[0].players[1]._id = this.authService.currentUser._id) {
				this.myDeck = this.cardDeck.tMao;
				this.roundToPlay = 3;
			}
			else if (this.playingGame[0].players[2]._id = this.authService.currentUser._id) {
				this.myDeck = this.cardDeck.sMao;
				this.roundToPlay = 2;
			}
			else if (this.playingGame[0].players[3]._id = this.authService.currentUser._id) {
				this.myDeck = this.cardDeck.qMao;
				this.roundToPlay = 4;
			}
		}
	}

	isMyRound() {
		if(this.playerRound == this.roundToPlay){
			return true;
		}
		return false;
	}

	playCard(card: any){
		if(this.isMyRound()){
			this.myDeck.forEach( c => {
				if(c == card){
					c.jogada = 'played';
				}
			})
			this.suecaService.sendPlayCard(card,this.gameId,this.playerRound);
		}
	}
	
}