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

	createSocketGame(game: Game, baralho: Baralho) {
		this.socket.emit('new_game', {game, baralho});
	}

	joinSocketGame(game: Game, player: User) {
		this.socket.emit('join_game', {game, player});
	}

	sendChatMessage(message: any) {
        this.socket.emit('chat', [JSON.parse(sessionStorage.getItem('player')).username] +': '+ message);
    }

    sendLobbyChatMessage(message: any) {
        this.socket.emit('chat-lobby', [JSON.parse(sessionStorage.getItem('player')).username] +': '+ message);
    }

    getPlayersMessages(): Observable<any> {
        return this.channelListenning('players');
    }

    getChatMessages(): Observable<any> {
        return this.channelListenning('chat');
    }

    getChatLobbyMessages(): Observable<any> {
    	return this.channelListenning('chat-lobby')
    }



	private buildHeaders(user: User): RequestOptions {
		let headers = new Headers();
		headers.append('Authorization', 'bearer ' + user.token);
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}

	createNewGame(user: User, baralho: Baralho): Observable<string> {
		let options = this.buildHeaders(user);

		return this.http.post('http://localhost:7777/api/v1/games', 
			{creatorId: user._id, creatorUsername: user.username , state: 'pending', baralho: {baralho}, players: [{ player: user._id, points: 0 }]}, options)
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


	joinPendingGame(user: User, game: Game): Observable<any> {
		let options = this.buildHeaders(user);

		return this.http.put('http://localhost:7777/api/v1/joingame/'+ game._id, {player: user._id, score: 0} , options)
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