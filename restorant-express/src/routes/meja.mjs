import pool from "../db.mjs";
import { Router } from "express";
import isAuthenticated from "../utils/middleware.mjs";

const meja = Router();

meja.get("/api/meja/ambilSemuaData" , isAuthenticated ,async(request,respond)=>{
    try{
        const query = "SELECT * FROM meja";
        const [row] = await pool.query(query);
        respond.status(200).send(row)
    }
    catch(error){
        respond.sendStatus(400);
    }
});

meja.patch("/api/meja/UpdateStatus" , isAuthenticated , async (requst , respond) => {
    try{
        let {meja_id} = requst.body;
        const query = "UPDATE meja SET meja_status = ? WHERE meja_id = ?";
        await pool.query(query , ["Terisi",meja_id]);
        respond.sendStatus(200);
    }
    catch(error){
        respond.sendStatus(404);
    }
})

export default meja;
