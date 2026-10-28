import express from 'express';
import dotenv from 'dotenv';
import employeeRouter from './routes/employee.mjs';
import product from './routes/product.mjs';
import order from './routes/order.mjs';
import session from "express-session";
import passport from "passport";
import "./stratergy/stratergy.mjs";
import pool from './db.mjs'
import MySQLStore from 'express-mysql-session';
import rateLimit from 'express-rate-limit';
import meja from './routes/meja.mjs';


dotenv.config();
const MySQLStoreSession = MySQLStore(session)  
const sessionStore = new MySQLStoreSession({},pool);
const app = express();
const PORT = process.env.PORT;
const getFoodLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100
});
app.listen(PORT);
app.use(getFoodLimiter)
app.use(express.json());
app.use(
    session({
        secret:"secret",
        saveUninitialized:false,
        resave:false,
        store: sessionStore,
        cookie:{
            maxAge: 60000 * 60 * 24
        }
    })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(employeeRouter);
app.use(product);
app.use(order);
app.use(meja);

