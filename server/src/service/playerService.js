import bcrypt from 'bcryptjs';
import Player from '../models/Player.js';
import { generateToken } from '../utils/tokenUtils.js';
import InvalidToken from '../models/InvalidToken.js';

export default {
    async register(playerData) {
        const player = await Player.create(playerData)

        const token = generateToken(player);

        return { player, token };
    },
    async login(nickname, password) {
        const player = await Player.findOne({ nickname });
        if (!player) {
            throw new Error('Email or password are incorrect!');
        }

        const isValid = await bcrypt.compare(password, player.password);
        if (!isValid) {
            throw new Error('Email or password are incorrect!');
        }

        const token = generateToken(player);

        return { player, token };
    },
    invalidateToken(token) {
        return InvalidToken.create({token});
    }
}
