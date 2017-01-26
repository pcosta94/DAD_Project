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

		this.suecaService.getNewPendingGame().subscribe((m: any) => {
			this.refresh();
		});

		this.suecaService.getDeleteGame().subscribe((m: any) => {
			this.refresh();
		});

		this.suecaService.getJoinGame().subscribe((m: any) => {
			this.refresh();
		})

		this.suecaService.getStartGame().subscribe((m: any) => {
			this.router.navigateByUrl('/game/'+ m);
		});
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
		this.suecaService.createNewGame(this.authService.currentUser).subscribe((response: any) =>{
			if(response){
				this.suecaService.createSocketGame(response);
				this.pendingGames.push(response);
			}else{
				console.error('Não foi possivel criar o jogo');
			}
		});
	}

	deletePendingGame(id: string) {
		this.suecaService.deletePendingGame(id, this.authService.currentUser).subscribe((response: any) => {
			this.suecaService.sendDeleteGame(id);
		});
	}

	joinPendingGame(i: number){
		let game = this.pendingGames[i];
		if(game.players.length < 4){
			this.suecaService.joinPendingGame(this.authService.currentUser, game).subscribe((response: any) => {
				this.suecaService.sendJoinGame(response, this.authService.currentUser);
			});
		}
	}

	startPendingGame(){
		this.pendingGames.forEach( game => {
			if(game.players.length == 4){
				this.suecaService.startPendingGame(this.authService.currentUser, game).subscribe((response: any) => {
					this.suecaService.sendStartGame(game);
				});
			}
		});
	}

	isPlayerJoinned(i: number): boolean{
		let isJoinned: boolean = false;
		this.pendingGames[i].players.forEach( player => {
			if( player._id == this.authService.currentUser._id){
				return isJoinned = true;
			}
		})
		return isJoinned;
	}

	
}