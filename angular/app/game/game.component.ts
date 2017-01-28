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
	public playingGame: any;
	public teamMateHand: any[] = [];
	public adversariesHand: any[] = [];
	public turnToPlay: number;
	
	public cardDeck: Baralho;
	public myHand: any[] = [];
	public playTurnCounter: number = 1;
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
				console.log(m);
				this.setGameAtributes(m);
		});

		this.suecaService.getPlayedCard().subscribe((m:any) => {
			
		});

		console.log(this.myHand);
	
	}

	setGameAtributes(game: any){
		if(game.playerId == this.authService.currentUser._id){
			this.myHand = game.playerHand;
			this.turnToPlay = game.playerTurn;
		}

	}

	isMyTurnToPlay() {
		if(this.playTurnCounter == this.turnToPlay){
			return true;
		}
		return false;
	}

	playCard(card: any){
		if(this.isMyTurnToPlay()){
			this.suecaService.sendPlayCard(card,this.gameId);
		}
	}
	
}