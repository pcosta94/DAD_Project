export class Game {
	constructor(
		public _id: string,
		public creatorUsername: string,
		public state: string,
		public gameStart: string,
		public gameEnd: string,
		public winnersId: string[],
		public baralho: {},
		public players: [{}]
	){}
}