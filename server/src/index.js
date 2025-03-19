import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';
import cookieParser from 'cookie-parser';
import { authMiddleware }  from './middlewares/authMiddleware.js';

const app = express();

try {
    
    await mongoose.connect('mongodb://127.0.0.1:3000/pnasters');

    console.log('DB connected successfully! ');
} catch (err) {
    console.log('Connection to DB failed!');
    console.log(err.message);
}


app.use(express.static('src/static'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(authMiddleware);

app.use(routes);

app.listen(3000, () => console.log(' server is running on http://localhost:3000...'))
