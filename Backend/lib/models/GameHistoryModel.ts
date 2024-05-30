import mongoose, { Schema, Document } from 'mongoose';

interface IGameHistory extends Document {
    username: string,
    gameId: number,
    location: string,
    date: string,
    players: string, //coma separeted list of usernames
    winner: string,
    playtime: number
}

const GameHistorySchema: Schema = new Schema({
    username: {type: String, required: true },
    gameId:{ type: Number, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    players: { type: String, required: false }, //coma separeted list of users
    winner: { type: String, required: true },
    playtime: {type: Number, required: true}
});

const GameHistoryModel = mongoose.model<IGameHistory>('gameHistory', GameHistorySchema);

export default GameHistoryModel;
