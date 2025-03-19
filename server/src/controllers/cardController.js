import { Router } from "express";
import cardService from "../service/cardService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const cardController = Router();

function buildFilter(query) {
    const filterResult = Object.keys(query).reduce((filter, filterParam) => {
        const filterParamValue = query[filterParam].replaceAll('"', '');

        const searchParams = new URLSearchParams(filterParamValue);
        
        return { ...filter, ...Object.fromEntries(searchParams.entries()) };
    }, {})

    return filterResult
};


cardController.get('/', async (req, res) => {  const filter = buildFilter(req.query);
    
    const cardLibrary = await cardService.getAll(filter);

    res.json(cardLibrary);
});


cardController.get('/:cardId', async (req, res) => {
    const cardDraw = await cardService.getOne(req.params.cardId);

    res.json(cardDraw);
});


cardController.post('/', isAuth, async (req, res) => {
    const cardData = req.body;
    const playerId = req.player.id;

    const newCard = await cardService.create(cardData, playerId);

    res.json(newCard);
});


cardController.put('/:cardId', async (req, res) => {
    const cardId = req.params.cardId;
    const cardData = req.body;

    const updatedCard = await cardService.update(cardId, cardData);

    res.json(updatedCard);
});


cardController.delete('/:cardId', async (req, res) => {
    const cardId = req.params.cardId;

    await cardService.delete(cardId);

    res.json({ ok: true });
});

export default cardController;
