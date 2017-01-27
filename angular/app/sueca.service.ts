import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from './user';
import { Game } from './game/game';
import { Baralho } from './game/baralho';
import * as io from 'socket.io-client';

@Injectable()
export class SuecaService {
	private socket: SocketIOClient.Socket;
	private gameRoom: String;

	constructor(private http: Http) {
		if (!this.socket) {
			this.socket = io(`http://${window.location.hostname}:7777/`);
		}
	}

	private channelListenning(channel: string): Observable<any>{
		return new Observable((observer:any) => {
  			this.socket.on(channel, (data:any) => {
  				observer.next(data);
  			});
  			return () => this.socket.disconnect();
  		});
	}

	sendLoginUser(message: any) {
	    this.socket.emit('login', message);
	} 

	createSocketGame(game: any, user: any) {
		this.socket.emit('new_game', {game, user});
	}

	getNewPendingGame() {
		return this.channelListenning('new_game');
	}

	sendJoinGame(game: Game, user: any) {
		this.socket.emit('join_game', {game, user});
	}

	sendChatMessage(message: any) {
        this.socket.emit('chat', [JSON.parse(sessionStorage.getItem('player')).username] +': '+ message);
    }

    sendLobbyChatMessage(message: any) {
        this.socket.emit('chat-lobby', [JSON.parse(sessionStorage.getItem('player')).username] +': '+ message);
    }

    sendGameChatMessage(message: any, game: any) {
        this.socket.emit('chat-game', {message, game});
    }

    sendDeleteGame(message: any) {
    	this.socket.emit('delete_game', message);
    }

    sendStartGame(game: any) {
    	this.socket.emit('start_game', game);
    }

    sendGetPlayingGame(id: any) {
    	this.socket.emit('playing_game', id);
    }


    getDeleteGame(): Observable<any> {
    	return this.channelListenning('delete_game');
    }

    getJoinGame(): Observable<any> {
    	return this.channelListenning('update_game');
    }

    getStartGame(): Observable<any> {
    	return this.channelListenning('start_game');
    }

    getGame(): Observable<any> {
    	return this.channelListenning('playing_game')
    }

    getPlayersMessages(): Observable<any> {
        return this.channelListenning('players');
    }

    getChatMessages(): Observable<any> {
        return this.channelListenning('chat');
    }

    getChatLobbyMessages(): Observable<any> {
    	return this.channelListenning('chat-lobby');
    }

    getChatGameMessages(): Observable<any> {
    	return this.channelListenning('chat-game');
    }



	private buildHeaders(user: User): RequestOptions {
		let headers = new Headers();
		headers.append('Authorization', 'bearer ' + user.token);
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}

	createNewGame(user: User): Observable<string> {
		let options = this.buildHeaders(user);

		return this.http.post('http://localhost:7777/api/v1/games', 
			{creatorId: user._id, creatorUsername: user.username , state: 'pending', players: [user]} , options)
			.map(response => {
				return response.json();
			})
			.catch(error => {
				console.log(error);
				return Observable.throw(error);
			});
	}

	deletePendingGame(id: string, user: User): Observable<string> {
		let options = this.buildHeaders(user);

		return this.http.delete('http://localhost:7777/api/v1/games/'+ id, options)
			.map(response => {
				return response.json();
			})
			.catch(error => {
				console.log(error);
				return Observable.throw(error);
			});
	}

	getPendingGames(user: User): Observable<Game[]> {
		let options = this.buildHeaders(user);
		let pendingGames: Game[] = [];

		return this.http.get('http://localhost:7777/api/v1/games', options)
			.map(res => {
				let response = res.json();
				response.forEach((game: Game) =>{
					if(game.state === 'pending') {
						pendingGames.push(game);
					}
				});
				return pendingGames;
			})
			.catch(e =>{
				console.log(e);
				return Observable.throw(e)
			});
	}

	getPlayingGames(user: User): Observable<Game[]> {
		let options = this.buildHeaders(user);
		let playingGame: Game[] = [];

		return this.http.get('http://localhost:7777/api/v1/games', options)
			.map(res => {
				let response = res.json();
				response.forEach((game: Game) =>{
					if(game.state === 'playing') {
						game.players.forEach((palyer: User) => {
							if(palyer._id === user._id){
								playingGame.push(game);
							}
						});
					}
				});
				return playingGame;
			})
			.catch(e =>{
				console.log(e);
				return Observable.throw(e);
			});
	}

	joinPendingGame(user: User, game: Game): Observable<any> {
		let options = this.buildHeaders(user);

		return this.http.put('http://localhost:7777/api/v1/join/'+ game._id, user , options)
	      .map(res => {
	        let resJSON = res.json();
	        return resJSON;
	      })
	      .catch(e => {
	        console.log(e);
	        return Observable.throw(e);
	      });
	}

	startPendingGame(user: User, game: Game): Observable<any> {
		let options = this.buildHeaders(user);

		return this.http.put('http://localhost:7777/api/v1/startgame/'+ game._id, null , options)
	      .map(res => {
	        let resJSON = res.json();
	        return resJSON;
	      })
	      .catch(e => {
	        console.log(e);
	        return Observable.throw(e);
	      });
	}


}