import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import path from 'path';
import BoardGameModel from "../models/BoardGameModel";
import ChallengeModel from "../models/ChallengeModel";

class ChallengeController implements Controller {
    public path = '/api/challenge';
    public pathAll = '/api/challenge/all'
    public pathSingle = '/api/challenge/single'
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(this.path, this.createChallenge);
        this.router.put(this.path, this.updateProgress);
        this.router.get(this.pathAll, this.getAllChallengesOfUser)
        this.router.get(this.pathSingle, this.getSingleChallenge)
        this.router.delete(this.path, this.deleteSingleChallenge)
    }

    private createChallenge = async (request: Request, response: Response) => {
        const { username, title, description, targetValue, progressValue } = request.body;
        try {
            const newChallenge = new ChallengeModel({ username, title, description, targetValue, progressValue });
            await newChallenge.save();
            response.status(201).json(newChallenge);
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Error occurred creating challenge' });
        }
    };
    private updateProgress = async (request: Request, response: Response) => {
        const { username, title, progressValue } = request.body;
        try {
          const existingChallenge = await ChallengeModel.findOne({ username, title });

            if (!existingChallenge) {
               return response.status(404).json({ error: 'Challenge not found' });
            }

         existingChallenge.progressValue = progressValue;

          await existingChallenge.save();

          response.status(200).json(existingChallenge);
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Error occurred updating challenge progress' });
        }
    };
    private getAllChallengesOfUser = async (request: Request, response: Response) => {
        const { username } = request.query;
        try {
            const query = { username };
            const challenges = await ChallengeModel.find(query);

            if (!challenges || challenges.length === 0) {
                response.status(404).json({ error: 'Challenges not found' });
            } else {
                response.status(200).json(challenges);
            }
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Getting challenges failed' });
        }
    };
    private getSingleChallenge = async (request: Request, response: Response) => {
        const { username, title } = request.query;
        try {
            const query = { username, title };
            const challenge = await ChallengeModel.findOne(query);

            if (!challenge) {
                response.status(404).json({ error: 'Challenge not found' });
            } else {
                response.status(200).json(challenge);
            }
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Getting challenges failed' });
        }
    };
    private deleteSingleChallenge = async (request: Request, response: Response) => {
        const { title, username } = request.query;
        try {
            const query = { title, username };
            const result = await ChallengeModel.deleteOne(query);

            if (result.deletedCount === 0) {
                response.status(404).json({ error: 'Challenge not found' });
            } else {
                response.status(200).json({ message: 'Challenge deleted successfully' });
            }
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Deleting Challenge failed' });
        }
    };
}

export default ChallengeController;
