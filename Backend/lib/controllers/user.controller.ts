import Controller from '../interfaces/controller.interface';
import { Request, Response, Router } from 'express';
import BoardGameModel from "../models/BoardGameModel";
import UserModel from "../models/UserModel";
class UserController implements Controller {

    public path = '/api/user';
    public pathRegister = '/api/user/register';
    public pathLogin = '/api/user/login'
    public pathID = '/api/user/id'
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.pathRegister, this.register);
        this.router.post(this.pathLogin, this.login);
        this.router.delete(this.path, this.deleteAccount);
        this.router.get(this.pathID, this.getIdAndEmailOfUser);
    }


    private register = async (request: Request, response: Response) => {
        const { username, email, password } = request.body;
        try {
            const newUser = new UserModel({ username, email, password });
            await newUser.save();
            response.status(201).json(newUser);
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Couldnt register this user' });
        }
    };
    private login = async (request: Request, response: Response) => {
        const { username, password } = request.body;

        try {
            const query = { username };
            const user = await UserModel.findOne(query);

            if (!user) {
                return response.status(404).json({ error: 'User not found' });
            }

            const passwordMatch = await user.comparePassword(password);

            if (!passwordMatch) {
                return response.status(401).json({ error: 'Invalid password' });
            }
            return response.status(200).json({ message: 'Login successful', id: user._id.toString() });
        } catch (error) {
            console.error('Error:', error);
            return response.status(500).json({ error: 'Could not login this user' });
        }
    };

    private deleteAccount = async (request: Request, response: Response) => {
        const { username } = request.query;
        try {
            const query = { username };
            const result = await UserModel.deleteOne(query);

            if (result.deletedCount === 0) {
                response.status(404).json({ error: 'Username not found' });
            } else {
                response.status(200).json({ message: 'Account deleted successfully' });
            }
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Deleting account failed' });
        }
    };

    private getIdAndEmailOfUser = async (request: Request, response: Response) => {
        const { username } = request.query;
        try {
            const query = { username };
            const user = await UserModel.findOne(query);

            if (!user) {
                return response.status(404).json({ error: 'User not found' });
            }

            return response.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email
            });
        } catch (error) {
            console.error('Error:', error);
            return response.status(500).json({ error: 'Error occured' });
        }
    }
}


export default UserController;
