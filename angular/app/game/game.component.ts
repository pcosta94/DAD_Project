import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SuecaService } from '../sueca.service';
import { ActivatedRoute } from '@angular/router';
import { Baralho } from './baralho';
import { Game } from  './game';
import { Naipe } from './naipe';
import { GameChatComponent } from './game-chat.component';


@Component({
	moduleId: module.id,
	selector: 'game',
	templateUrl: 'game.component.html'
})

export class GameComponent implements OnInit {
	public myPoints: number = 0;
	public gameId: any;
	public playingGame: any;
	public teamMateHand: any[] = [];
	public adversariesHand: any[] = [];
	public turnToPlay: number;
	public playerNumber: number;
	public team1: any[] = [];
	public team2: any[] = [];
	public trunfo: Naipe;

	public cardDeck: Baralho;
	public myHand: any[] = [];
	public playedCards: any[] = [];
	public playTurnCounter: number = 1;
	public plays: any[] = [];
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
				if(m.playerId == this.authService.currentUser._id){
					this.playerNumber = m.playerNumber;
					this.turnToPlay = m.playerTurn ;
					this.myHand = m.playerHand;
					this.trunfo = m.trunfo
				}

				//this.setGameAtributes(m);
		});

		this.suecaService.getPlayedCard().subscribe((m:any) => {
			if(this.playTurnCounter == this.turnToPlay){
				this.myHand = m.hand;
				console.log(m);
			}
			if(this.playTurnCounter <=4 ){
				this.playTurnCounter++;
				this.playedCards.push(m.playedCard);
				this.plays.push(m.play);
				if(this.playTurnCounter == 5 ){
					this.round[this.roundCounter] = this.plays;
					this.roundCounter ++;
					this.playTurnCounter = 1;
					this.suecaService.sendPlayedRound(this.plays,this.trunfo);
				}

				
			}
		});

		this.suecaService.getPlayedRound().subscribe((m:any) => {
			console.log(m);
			

		});

	
	}

	playCard(card: any){
		if(this.playTurnCounter == this.turnToPlay){
			let play = {
				gameId: this.gameId,
				playerId: this.authService.currentUser._id,
				playedCard: card
			}
			this.suecaService.sendPlayCard(play,this.gameId);
		}
	}
	
}