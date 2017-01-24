import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../game/game';
import { Baralho } from '../game/baralho'
import { AuthService } from '../auth.service';
import { SuecaService } from '../sueca.service';

@Component({
	moduleId: module.id,
	selector: 'lobby',
	templateUrl: 'game-lobby.component.html'
})
export class GameLobbyComponent implements OnInit{
	public pendingGames: Game[] = [];

	constructor(private authService: AuthService,
				private suecaService: SuecaService,
				private router: Router){}

	ngOnInit(){
		this.refresh();
		console.log(this.pendingGames);
	}

	refresh(){
		this.suecaService.getPendingGames(this.authService.currentUser).subscribe(response =>{
			this.pendingGames = [];
			response.forEach(game =>{
				this.pendingGames.push(game);
			})
		})
	}

	createNewGame(){
		let baralho: Baralho = new Baralho();

		this.suecaService.createNewGame(this.authService.currentUser,baralho).subscribe((response: any) =>{
			if(response){
				this.suecaService.createSocketGame(response,baralho);
				console.log(response);
				this.pendingGames.push(response);
			}else{
				console.error('Não foi possivel criar o jogo');
			}
		});
	}

	deletePendingGame(id: string) {
		this.suecaService.deletePendingGame(id, this.authService.currentUser).subscribe((response: any) => {
			//this.suecaService.sendDeleteGame();
		});
		this.refresh();
	}

	joinPendingGame(i: number){
		let game = this.pendingGames[i];
		if(game.players.length < 4){
			this.suecaService.joinPendingGame(this.authService.currentUser, game).subscribe((response: any) => {
				this.suecaService.joinSocketGame(response, this.authService.currentUser);
			});
		}
	}

	
}