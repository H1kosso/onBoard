import mongoose, { Schema, Document } from 'mongoose';

interface IBoardgame extends Document {
    gameId: Number;
    title: string;
    image: string;
    categories: string; //coma separated list
}

const BoardGameSchema: Schema = new Schema({
    gameId:{ type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    categories: { type: String, required: true },
});

const BoardGameModel = mongoose.model<IBoardgame>('boardgames', BoardGameSchema);

export default BoardGameModel;
