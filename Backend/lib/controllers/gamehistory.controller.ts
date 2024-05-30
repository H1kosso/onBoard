import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import path from 'path';
import BoardGameModel from "../models/BoardGameModel";
import GameHistoryModel from "../models/GameHistoryModel";
import ChallengeModel from "../models/ChallengeModel";

class GameHistoryController implements Controller {
    public path = '/api/gamehistory';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.createGame);
        this.router.get(this.path, this.getAllPlayedGameOfUser);
        this.router.delete(this.path, this.deleteGamePlayed)
    }

    private createGame = async (request: Request, response: Response) => {
        const {username, gameId, location, date, players, winner, playtime} = request.body;
        try {
            const newGame = new GameHistoryModel({username, gameId, location, date, players, winner, playtime});
            await newGame.save();
            response.status(201).json(newGame);
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({error: 'Error occurred creating game'});
        }
    };

    private getAllPlayedGameOfUser = async (request: Request, response: Response) => {
        const {username} = request.query;
        try {
            const query = {username};
            const games = await GameHistoryModel.find(query);

            if (!games || games.length === 0) {
                response.status(404).json({error: 'Games not found'});
            } else {
                response.status(200).json(games);
            }
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({error: 'Getting challenges failed'});
        }
    };

    private deleteGamePlayed = async (request: Request, response: Response) => {
        const { username, date, gameId } = request.query;
        try {
            const query = { username, date, gameId };
            const result = await GameHistoryModel.deleteOne(query);

            if (result.deletedCount === 0) {
                response.status(404).json({ error: 'Game not found' });
            } else {
                response.status(200).json({ message: 'Game deleted successfully' });
            }
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Deleting Game failed' });
        }
    };
}

export default GameHistoryController;
