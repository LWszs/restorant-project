import express from 'express';
import dotenv from 'dotenv';
import http from "http";
import {Server} from "socket.io";
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
const FRONTEND_URl = process.env.FRONTEND_URL;
const server = http.createServer(app);
const io = new Server (server , {
    cors : {
        origin : FRONTEND_URl,
        credentials: true
    }
});
app.set("io", io);
const getFoodLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100
});
server.listen(PORT);
app.use(getFoodLimiter)
app.use(express.json());
app.use(
    session({
        secret:process.env.SESSION_SECRET,
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

io.on("connection", (socket) => {
    console.log("User terhubung:", socket.id);
});


