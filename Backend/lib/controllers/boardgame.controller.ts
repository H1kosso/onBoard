import Controller from '../interfaces/controller.interface';
import { Request, Response, Router } from 'express';
import BoardGameModel from "../models/BoardGameModel";
import {Schema} from "mongoose";




class BoardgameController implements Controller {
    public pathAll = '/api/boardgame/all';
    public path = '/api/boardgame';
    public pathId = '/api/boardgame/id';
    public pathName = '/api/boardgame/name';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(    this.pathName, this.getSingleBoardgameByName);
        this.router.get(    this.pathId, this.getSingleBoardgameById);
        this.router.delete( this.path, this.deleteSingleBoardgame)
        this.router.post(   this.path, this.createBoardgame);
        this.router.get(    this.pathAll,         this.getAllBoardgames);
    }

    private getSingleBoardgameByName = async (request: Request, response: Response) => {
        const { title } = request.query;
        try {
            const query = { title };
            const boardgame = await BoardGameModel.findOne(query);

            if (!boardgame) {
                response.status(404).json({ error: 'Game not found' });
            } else {
                response.status(200).json(boardgame);
            }
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Getting game failed' });
        }
    };

private getSingleBoardgameById = async (request: Request, response: Response) => {
    const { id } = request.query;
    console.log(id)
    try {
        const query = { gameId: id };
        const boardgame = await BoardGameModel.findOne(query);

        if (!boardgame) {
            return response.status(404).json({ error: 'Game not found' });
        }

        return response.status(200).json(boardgame);
    } catch (error) {
        console.error('Error:', error);
        return response.status(500).json({ error: 'Getting game failed' });
    }
};


    private deleteSingleBoardgame = async (request: Request, response: Response) => {
        const { title } = request.query;
        try {
            const query = { title };
            const result = await BoardGameModel.deleteOne(query);

            if (result.deletedCount === 0) {
                response.status(404).json({ error: 'Game not found' });
            } else {
                response.status(200).json({ message: 'Game deleted successfully' });
            }
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Deleting game failed' });
        }
    };

    private getAllBoardgames = async (request: Request, response: Response) => {
        try {
            const boardgames = await BoardGameModel.find();
            response.status(201);
            response.json(boardgames);
        } catch (error) {
            console.error('Getting all boardgames failed:', error);
            response.status(500).json({ error: 'Getting all boardgames failed' });
        }
    };
    private createBoardgame = async (request: Request, response: Response) => {
        const { gameId, title, image, categories } = request.body;
        try {
            const newBoardgame = new BoardGameModel({ gameId, title, image, categories });
            await newBoardgame.save();
            response.status(201).json(newBoardgame);
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Error occurred creating game' });
        }
    };
}

export default BoardgameController;
