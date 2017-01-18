export class Game {
	constructor(
		public _id: string,
		public creatorId: string,
		public state: string,
		public gameStart: string,
		public gameEnd: string,
		public winnersId: string[],
		public playersId: string[]
	){}
}