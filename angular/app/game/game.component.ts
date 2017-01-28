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
	
	public cardDeck: Baralho;
	public myDeck: any[] = [];
	public playCounter: number = 0;
	public play: any[] = [];
	public roundCounter: number = 0;
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
				//console.log(m);
				this.setGameAtributes(m);
		});

		this.suecaService.getPlayedCard().subscribe((m:any) => {
			if(this.playCounter < 4){
				this.playCounter = m.round++;
				this.round.push(m.card);
			}
		});

	
	}

	setGameAtributes(game: any){
		console.log(game);
		console.log(this.playingGame);
		if(this.playingGame == []){
			if(game.playerId == this.authService.currentUser._id){
				console.log(game);
				this.playingGame.push(game);
			}
		}
	}

	isMyPlay() {
		if(this.playCounter == this.roundToPlay){
			return true;
		}
		return false;
	}

	playCard(card: any){
		if(this.isMyPlay()){
			this.suecaService.sendPlayCard(card,this.gameId);
		}
	}
	
}