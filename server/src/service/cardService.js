import Card from "../models/Card.js";

export default {
    getAll(filter = {}) {
        return Card.find(filter);
    },
    getOne(cardDraw) {
        return Card.findById(cardDraw);
    },
    create(cardData, playerId) {
        return Card.create({ ...cardData, _ownerId: playerId });
    },
    update(cardId, cardData) {
        return Card.findByIdAndUpdate(cardId, cardData);
    },
    delete(cardId) {
        return Card.findByIdAndDelete(cardId);
    },
    randomDraw() {

    }
}
