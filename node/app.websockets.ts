const io = require('socket.io');


export class WebSocketServer{
	public io: any;

	public init = (server: any) => {
		this.io = io.listen(server);

		this.io.sockets.on('connection', (socket: any) => {
			socket.on('new_game', (game) => {
				let newGa
			});
		});
	}
}