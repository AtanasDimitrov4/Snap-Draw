import { Router } from "express";

import playerService from "../service/playerService.js";

const playerController = Router();

playerController.post('/register', async (req, res) => {
    const playerData = req.body;

    const { player, token } = await playerService.register(playerData);

    res.json({
        _id: player.id,
        accessToken: token,
        nickname: player.nickname,
    });
});

playerController.post('/login', async (req, res) => {
    const { nickname, password } = req.body;

    const { player, token } = await playerService.login(nickname, password)

    res.json({
        _id: player.id,
        accessToken: token,
        email: player.email,
    });
});

playerController.get('/logout', async (req, res) => {
    const token = req.headers['x-authorization'];

    await playerService.invalidateToken(token);

    res.json({});
});

export default playerController;
