import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    try {
        return this.password === candidatePassword;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
};


const UserModel = mongoose.model<IUser>('users', UserSchema);

export default UserModel;
