import { model, Schema, Types } from "mongoose";

const cardSchema = new Schema({
    cardName: {
        type: String,
    },  
    cost: {
        type: Number,
       
    },
    power: {
        type: Number,
        
    },
    description: {
        type: String,
        minLength: 10,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    owners_Id: {
        type: Types.ObjectId,
        ref: 'Player',
    }
});

const Card = model('Card', cardSchema);

export default Card;
