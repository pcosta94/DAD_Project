import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from './user';
//import { Game } from './game';
import * as io from 'socket.io-client';

@Injectable()
export class GameService {
	private socket: SocketIOClient.Socket;
	private gameRoom: String;

	constructor(private http: Http) {
		if (!this.socket) {
			this.socket = io(`http://${window.location.hostname}:7777/`);
		}
	}

	public getGameRoom(): String {
		return this.gameRoom;
	}

	public setGameRoom(gameRoom: String): void {
		this.gameRoom = gameRoom;
	}
// MESSAGES
	sendLoginMessage(message: any) {
    this.socket.emit('login', message);
  }

	getPlayersMessages(): Observable<any> {
    return this.listenOnChannel('players');
  }

  sendChatMessage(message: any) {
    this.socket.emit('chat', message);
  }

  getChatMessages(): Observable<any> {
    return this.listenOnChannel('chat');
  }

	sendRoomChatMessage(gameRoom: String, message: any) {
		this.socket.emit('room_chat', {gameRoom, message});
  }

  getRoomChatMessages(): Observable<any> {
    return this.listenOnChannel('room_chat');
  }

	// createGame(game : Game): void {
	// 	this.socket.emit('new_game', game);
	// }

	getNewGame(): Observable<any> {
		return this.listenOnChannel('new_game');
	}

	// joinGame(game: Game, player: any): void {
	// 	this.socket.emit('join_game', {game , player});
	// }

	// updateGame(): Observable<any> {
	// 	return this.listenOnChannel('update_game');
	// }

	// startGame(game: Game): void {
	// 	this.socket.emit('start_game', game);
	// }

	// getStartGame(): Observable<any> {
  //   return this.listenOnChannel('start_game');
  // }

	// sendNumberOfPlayers(game: Game): void {
	// 	this.socket.emit('number_of_players', game);
	// }

	getNumberOfPlayers(): Observable<any> {
    return this.listenOnChannel('number_of_players');
  }

	getBoard(): Observable<any> {
    return this.listenOnChannel('board');
  }

	sendReady(gameRoom: String, myShips: any) {
		this.socket.emit('ready', {gameRoom, myShips});
  }

	getReady(): Observable<any> {
    return this.listenOnChannel('ready');
  }

	sendOpponentInfo(gameRoom: String, username: String, socketId: String) {
		this.socket.emit('opponent_info', {gameRoom, username, socketId});
  }

	// sendShootMessage(gameRoom: String, username : String, cell: Celula){
	// 	this.socket.emit('shot', {gameRoom, username, cell});
	// }

	getShootMessage(): Observable<any> {
		return this.listenOnChannel('shot');
	}

	getShipSinked(): Observable<any> {
		return this.listenOnChannel('ship_sinked');
	}

	getDefeatMessage(): Observable<any> {
		return this.listenOnChannel('opponent_defeated');
	}

	getPlayerDefeated(): Observable<any> {
		return this.listenOnChannel('player_defeated');
	}

	getScore(): Observable<any> {
		return this.listenOnChannel('score');
	}

	getDecrementShoot(): Observable<any> {
		return this.listenOnChannel('decrement_shoot');
	}

	getInitializeShoots(): Observable<any> {
		return this.listenOnChannel('initialize_shoots');
	}

	getChangePlayer(): Observable<any> {
		return this.listenOnChannel('change_player');
	}

	getVictory(): Observable<any> {
		return this.listenOnChannel('victory');
	}

	sendCancelGameMessage(){
      this.socket.emit('cancel_game');
  }

	sendRefresh(){
      this.socket.emit('refresh');
  }

  getRefresh(): Observable<any> {
      return this.listenOnChannel('refresh');
  }

	getEndGame(): Observable<any> {
      return this.listenOnChannel('end_game');
  }

// END MESSAGES

	// Vai criar um jogo e persistir na base  de dados
	createNewGame(user: User): Observable<string> {
		let options = this.buildHeaders(user);

		return this.http.post('http://localhost:7777/api/v1/games',
      {creatorId: user._id, state: 'pending', creatorUsername: user.username, players: [{ player: user._id, username:user.username, score: 0 }]}, options)
		.map(res => {
			return res.json();
		})
		.catch(e => {
			console.log(e);
			return Observable.throw(e);
		});
	}

  // joinGameBD(user: User, game: Game): Observable<any> {
  //   let options = this.buildHeaders(user);
  //
  //   return this.http.put('http://localhost:7777/api/v1/joingame/'+ game._id, {player: user._id, score: 0} , options)
  //     .map(res => {
  //       let resJSON = res.json();
  //       return resJSON;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       return Observable.throw(e);
  //     });
  // }

	// cancelGame(user: User, game: Game): Observable<string> {
	// 	let options = this.buildHeaders(user);
	//
	// 	return this.http.put('http://localhost:7777/api/v1/games/' + game._id + '/cancel', null, options)
	// 	.map(res => {
	// 		return res.json();
	// 	})
	// 	.catch(e => {
	// 		console.log(e);
	// 		return Observable.throw(e);
	// 	});
	// }

  // changeGameState(user: User, game: Game): Observable<Game> {
  //   let options = this.buildHeaders(user);
	//
  //   return this.http.put('http://localhost:7777/api/v1/gamestate/' + game._id, null, options)
  //     .map(res => {
  //         return res.json();
  //     })
  //     .catch(e => {
  //         console.log(e);
  //         return Observable.of<Game>(null);
  //     });
  // }
	//
	// updateMyScoreOnGame(user: User, gameId: String, score: number): Observable<Game> {
  //   let options = this.buildHeaders(user);
	//
	// 	return this.http.put('http://localhost:7777/api/v1/games/' + gameId + '/updatescore/' + user._id, {score: score}, options)
  //     .map(res => {
  //         return res.json();
  //     })
  //     .catch(e => {
  //         console.log(e);
  //         return Observable.of<Game>(null);
  //     });
  // }

	updatePlayerOnDefeat(user: User, score: number): Observable<User> {
    let options = this.buildHeaders(user);

		return this.http.put('http://localhost:7777/api/v1/players/' + user._id + '/updatedefeat', {score: score}, options)
      .map(res => {
          return res.json();
      })
      .catch(e => {
          console.log(e);
          return Observable.of<User>(null);
      });
  }

	// updateVictoryOnGame(user: User, gameId: String, score: number): Observable<Game> {
  //   let options = this.buildHeaders(user);
	//
	// 	return this.http.put('http://localhost:7777/api/v1/games/' + gameId + '/updatevictory/' + user._id, {username: user.username, score: score}, options)
  //     .map(res => {
  //         return res.json();
  //     })
  //     .catch(e => {
  //         console.log(e);
  //         return Observable.of<Game>(null);
  //     });
  // }

	updatePlayerOnVictory(user: User, score: number): Observable<User> {
    let options = this.buildHeaders(user);

		return this.http.put('http://localhost:7777/api/v1/players/' + user._id + '/updatevictory', {score: score}, options)
      .map(res => {
          return res.json();
      })
      .catch(e => {
          console.log(e);
          return Observable.of<User>(null);
      });
  }

	getPlayer(user: User, userId: String): Observable<User> {
    let options = this.buildHeaders(user);

    return this.http.get('http://localhost:7777/api/v1/players/' + userId, options)
      .map(res => {
          return res.json();
      })
      .catch(e => {
          console.log(e);
          return Observable.of<User>(null);
      });
  }

	// getGamesPending(user: User): Observable<Game[]> {
  //     let options = this.buildHeaders(user);
  //     let gamesPending: Game[] = [];
  //     return this.http.get('http://localhost:7777/api/v1/games', options)
  //         .map(res => {
  //             let resJSON = res.json();
  //             resJSON.forEach((game: Game) => {
  //               if(game.state === 'pending') {
  //                 gamesPending.push(game);
  //               }
  //             });
  //             return gamesPending;
  //         })
  //         .catch(e => {
  //               console.log(e);
  //               return Observable.throw(e);
  //         });
  // }

	buildHeaders(user: User): RequestOptions {
		let headers = new Headers();
		headers.append('Authorization', 'bearer ' + user.token);
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}

  private listenOnChannel(channel: string): Observable<any> {
		return new Observable((observer:any) => {
			this.socket.on(channel, (data:any) => {
				observer.next(data);
			});
			return () => this.socket.disconnect();
		});
	}

}
