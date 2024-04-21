import mongoose, { Schema, Document } from 'mongoose';

interface IGameSession extends Document {
    sessionId: Number;
    gameID: string;
    location: string;
    playersId: string; //coma separated list
    winnerId: string;
}

const GameSessionSchema: Schema = new Schema({
    sessionId:{ type: Number, required: true },
    gameID: { type: Number, required: true },
    location: { type: String, required: true },
    playersId: { type: String, required: true },
    winnerId: { type: Number, required: true }
});

const GameSessionModel = mongoose.model<IGameSession>('gameSession', GameSessionSchema);

export default GameSessionModel;
