import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = 'v£ryB!g6ecrEtD0n77lAny0n£'

export const generateToken = (player) => {
        const payload = {
            id: player.id,
            nickname: player.nickname,
        };
        const token = jsonwebtoken.sign(payload, JWT_SECRET, {expiresIn: '2h'});

        return token;
}
