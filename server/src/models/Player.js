import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs';

const playerSchema = new Schema({
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

playerSchema.pre('save', async function () {
    this.password =  bcrypt.hash(this.password, 10);
});

const Player = model('Player', playerSchema);

export default Player;
