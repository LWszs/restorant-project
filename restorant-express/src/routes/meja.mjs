import pool from "../db.mjs";
import { Router } from "express";
import isAuthenticated from "../utils/middleware.mjs";

const meja = Router();

meja.get("/api/meja/ambilSemuaData" , isAuthenticated ,async(request,respond)=>{
    try{
        console.log("Hello")
        const query = "SELECT * FROM meja";
        const [row] = await pool.query(query);
        respond.status(200).send(row)
    }
    catch(error){
        respond.sendStatus(400);
    }
});

export default meja;
