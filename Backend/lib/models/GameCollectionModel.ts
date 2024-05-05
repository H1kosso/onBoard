import mongoose, { Schema, Document } from 'mongoose';

interface IGameCollection extends Document {
    username: string,
    gameId: number,
    owned: boolean,
    buyPrice: number,
    whenBought: string,
    favourite: boolean,
}

const GameCollectionSchema: Schema = new Schema({
    username:{ type: String, required: true },
    gameId: { type: Number, required: true },
    owned: { type: Boolean, required: true },
    buyPrice: { type: String, required: true },
    whenBought: { type: String, required: true },
    favourite: { type: Boolean, required: true }
});

const GameCollectionModel = mongoose.model<IGameCollection>('gameCollection', GameCollectionSchema);

export default GameCollectionModel;
