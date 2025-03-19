import jsonwebtoken from "jsonwebtoken";
import InvalidToken from "../models/InvalidToken.js";




export const authMiddleware = async (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (!token) {
        return next();
    }

    const invalidToken = await InvalidToken.findOne({ token });
    if (invalidToken) {
        return res.json({ error: 'Invalid token!' });
    }

    try {
        const JWT_SECRET = 'v£ryB!g6ecrEtD0n77lAny0n£'
        const decodedToken = jsonwebtoken.verify(token, JWT_SECRET);

        req.player = decodedToken;
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('auth/login');
    }

    next();
};

export const isAuth = (req, res, next) => {
    if (!req.player) {
        return res.redirect('/auth/login');
    }

    next();
};

