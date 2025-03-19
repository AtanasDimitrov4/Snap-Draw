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
    source: {
        type: String,
        min: 0
    },
    img: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: false,
    },
   owners_Id: {
        type: Types.ObjectId,
        ref: 'Player',
    }
});

const Card = model('Card', cardSchema);

export default Card;
