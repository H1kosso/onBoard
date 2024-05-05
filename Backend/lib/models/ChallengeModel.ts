import mongoose, { Schema, Document } from 'mongoose';

interface IChallenge extends Document {
    username: string,
    title: string,
    description: string,
    targetvalue: number,
    progressValue: number,
}

const ChallengeSchema: Schema = new Schema({
    username:{ type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetValue: { type: Number, required: true },
    progressValue: { type: Number, required: true },
});

const ChallengeModel = mongoose.model<IChallenge>('challengeModel', ChallengeSchema);

export default ChallengeModel;
