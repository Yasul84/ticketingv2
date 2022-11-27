/* import express from 'express';
import 'express-async-errors'; 
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/Signin';
import { signoutRouter } from './routes/Signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error'; 

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res, next) => {
    throw new NotFoundError(); 
});

app.use(errorHandler); */

import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    console.log('Starting up...');
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined.');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined.');
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Connected to MongoDB.');
    } catch (error) {
        console.error(error);        
    }
    app.listen(3000, function () {
        console.log('Listening on port: 3000!');
    });
};

start();
