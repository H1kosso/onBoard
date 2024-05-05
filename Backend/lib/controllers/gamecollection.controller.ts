import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import path from 'path';
import ChallengeModel from "../models/ChallengeModel";
import GameCollectionModel from "../models/GameCollectionModel";

class GameCollectionController implements Controller {
    public path = '/api/collection';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.addGame);
        this.router.get(this.path, this.getAllGamesOfUser)
        this.router.delete(this.path, this.deleteSingleGame)
    }

    private addGame = async (request: Request, response: Response) => {
        const { username, gameId, owned, buyPrice, whenBought, favourite } = request.body;
        try {
            const newGame = new GameCollectionModel({ username, gameId, owned, buyPrice, whenBought, favourite});
            await newGame.save();
            response.status(201).json(newGame);
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Error occurred creating game' });
        }
    };
    private getAllGamesOfUser = async (request: Request, response: Response) => {
        const { username } = request.query;
        try {
            const query = { username };
            const games = await GameCollectionModel.find(query);

            if (!games || games.length === 0) {
                response.status(404).json({ error: 'Games not found' });
            } else {
                response.status(200).json(games);
            }
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Getting games failed' });
        }
    };

    private deleteSingleGame = async (request: Request, response: Response) => {
        const { username, gameId } = request.query;
        try {
            const query = { username, gameId };
            const result = await GameCollectionModel.deleteOne(query);

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

export default GameCollectionController;
