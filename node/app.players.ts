const mongodb = require('mongodb');
const util = require('util');
const sha1 = require('sha1');
import {HandlerSettings} from './handler.settings';
import {databaseConnection as database} from './app.database';


export class Player {

    private settings: HandlerSettings = null;

    private handleError = (err: string, response: any, next: any) => {
    	response.send(500, err);
	    next();
    }

    private returnPlayer = (id:string, response: any, next: any) => {
        database.db.collection('players')
            .findOne({
                _id: id
            })
            .then((player) => {
                if (player === null) {
                    response.send(404, 'Player not found');
                } else {
                    response.json(player);
                }
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    public getPlayers = (request: any, response: any, next: any) => {
        database.db.collection('players')
            .find()
            .toArray()
            .then(players => {
                response.json(players || []);
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    public getPlayer =  (request: any, response: any, next: any) => {
        const id = new mongodb.ObjectID(request.params.id);
        this.returnPlayer(id, response, next);
    }
    
    public updatePlayer = (request: any, response: any, next: any) => {
        const id = new mongodb.ObjectID(request.params.id);
        const player = request.body;

        if (player === undefined) {
            response.send(400, 'No player data');
            return next();
        }
        delete player._id;
        database.db.collection('players')
            .updateOne({
                _id: id
            }, {
                $set: player
            })
            .then(result => this.returnPlayer(id, response, next))
            .catch(err => this.handleError(err, response, next));
    }

    public updateOnDefeat = (request: any, response: any, next: any) => {
        const id = new mongodb.ObjectID(request.params.id);
        const score = request.body.score;

        if (id === undefined) {
            response.send(400, 'No player data');
            return next();
        }
        database.db.collection('players')
            .updateOne({
                _id: id
            }, {
                $inc: {totalScore: score}
            })
            .then(result => this.returnPlayer(id, response, next))
            .catch(err => this.handleError(err, response, next));
    }

    public updateOnVictory = (request: any, response: any, next: any) => {
        const id = new mongodb.ObjectID(request.params.id);
        const score = request.body.score;

        if (id === undefined) {
            response.send(400, 'No player data');
            return next();
        }
        database.db.collection('players')
            .updateOne({
                _id: id
            }, {
                $inc: {totalScore: score, totalVictories: 1}
            })
            .then(result => this.returnPlayer(id, response, next))
            .catch(err => this.handleError(err, response, next));
    }
    
    public createPlayer = (request: any, response: any, next: any) => {
        var player;
        if(request.body !== undefined) {   
            player = {}; 
            player.username = request.body.username,
            player.email = request.body.email,
            player.passwordHash = sha1(request.body.password),
            player.avatar = '',
            player.totalVictories = 0,
            player.totalScore = 0
        }
        
        if (player === undefined) {
            response.send(400, 'No player data');
            return next();
        }
        database.db.collection('players')
            .insertOne(player)
            .then(result => this.returnPlayer(result.insertedId, response, next))
            .catch(err => this.handleError(err, response, next));
    }

    public deletePlayer = (request: any, response: any, next: any) => {
        var id = new mongodb.ObjectID(request.params.id);
        database.db.collection('players')
            .deleteOne({
                _id: id
            })
            .then(result => {
                if (result.deletedCount === 1) {
                    response.json({
                        msg: util.format('Player -%s- Deleted', id)
                    });
                } else {
                    response.send(404, 'No player found');
                }
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }
        
    public getTop10 = (request: any, response: any, next: any) => {
        database.db.collection('players')
            .find()
            .sort({totalVictories:-1})
            .limit(10)
            .toArray()
            .then(players => {
                response.json(players || []);
                this.settings.wsServer.notifyAll('players', Date.now() + ': Somebody accessed top 10');
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    public getTop10ByVictories = (request: any, response: any, next: any) => {
        database.db.collection('players')
            .find()
            .sort({ totalVictories: -1 })
            .limit(10)
            .toArray()
            .then(players => {
                response.json(players || []);
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }
    public getTop10ByScore = (request: any, response: any, next: any) => {
        database.db.collection('players')
            .find()
            .sort({ totalScore: -1 })
            .limit(10)
            .toArray()
            .then(players => {
                response.json(players || []);
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    
    public registerPlayer = (request: any, response: any, next: any) => {
        database.db.collection('players')
            .findOne({ username: request.body.username })
            .then(player => {
                if(player !== null) {
                    response.json({
                        msg: util.format('Username already exists')
                    });
                } else {
                    database.db.collection('players')
                        .findOne({ email: request.body.email })
                        .then(player => {
                            if(player !== null) {
                                response.json({
                                    msg: util.format('Email already in use')
                                });
                            } else {
                                this.createPlayer(request, response, next);
                            }
                        })
                        .catch(err => this.handleError(err, response, next));
                }
            })
            .catch(err => this.handleError(err, response, next));
    }

    // Routes for the games
    public init = (server: any, settings: HandlerSettings) => {
        this.settings = settings;
        server.get(settings.prefix + 'top10ByScore', this.getTop10ByScore)
        server.get(settings.prefix + 'top10ByVictories', this.getTop10ByVictories);
        server.get(settings.prefix + 'players', settings.security.authorize, this.getPlayers);
        server.get(settings.prefix + 'players/:id', settings.security.authorize, this.getPlayer);
        server.put(settings.prefix + 'players/:id', settings.security.authorize, this.updatePlayer);
        server.put(settings.prefix + 'players/:id/updatedefeat', settings.security.authorize, this.updateOnDefeat);
        server.put(settings.prefix + 'players/:id/updatevictory', settings.security.authorize, this.updateOnVictory);
        server.post(settings.prefix + 'players', settings.security.authorize, this.createPlayer);
        server.del(settings.prefix + 'players/:id', settings.security.authorize, this.deletePlayer);
        server.post(settings.prefix + 'register', this.registerPlayer);
        console.log("Players routes registered");
    };
}