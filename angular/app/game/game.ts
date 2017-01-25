import  { Baralho } from './baralho';
import  { User } from '../user';

export class Game {
	constructor(
		public _id: string,
		public creatorUsername: string,
		public state: string,
		public gameStart: number,
		public gameEnd: number,
		public winnerTeam: {},
		public baralho: Baralho,
		public players: any[] = [],
	){}
}