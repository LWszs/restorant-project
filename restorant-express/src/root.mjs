import 'dotenv/config';
import express from 'express';
import http from "http";
import { Server } from "socket.io";
import cors from 'cors';
import session from "express-session";
import passport from "passport";
import MySQLStore from 'express-mysql-session';
import rateLimit from 'express-rate-limit';

import employeeRouter from './routes/employee.mjs';
import product from './routes/product.mjs';
import order from './routes/order.mjs';
import meja from './routes/meja.mjs';
import "./stratergy/stratergy.mjs";
import pool from './db.mjs';

const MySQLStoreSession = MySQLStore(session);
const sessionStore = new MySQLStoreSession({}, pool);

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        credentials: true
    }
});
app.set("io", io);

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100
});

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(limiter);
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        store: sessionStore,
        cookie: {
            maxAge: 60000 * 60 * 24,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(employeeRouter);
app.use(product);
app.use(order);
app.use(meja);
