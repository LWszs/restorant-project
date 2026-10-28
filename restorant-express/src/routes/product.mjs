import isAuthenticated from "../utils/middleware.mjs";
import pool from '../db.mjs';
import { Router } from "express";

const product = Router();

product.get('/api/product/getAllData', isAuthenticated , async(request,respond)=>{
    try{
        const query = "SELECT * FROM product";
        const [row] = await pool.query(query);
        respond.status(200).send(row);
    }
    catch(error){
        respond.sendStatus(400);
    }
})

export default product