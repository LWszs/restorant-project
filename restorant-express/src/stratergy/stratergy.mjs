import passport from "passport";
import { Strategy } from "passport-local";
import pool from '../db.mjs'
import { comparePassword} from "../utils/helpers.mjs";

export default passport.use(
    new Strategy(async (username,password,done) => {
        try{
            const query = "SELECT * FROM employee WHERE employee_name = ?"
            const [row] = await pool.query(query,[username]);
            if(row.length === 0){
                throw new Error("User not found");
            }
            if (!comparePassword(password,row[0].employee_password)){
                throw new Error("Invalid");
            }
            done(null,row[0]);
        }
        catch(error){
            done(null,false,{message:error.message});
        }
    })
)

passport.serializeUser((user,done) => {
    done(null,user.employee_id);
})

passport.deserializeUser(async (id,done) =>{
    try{
        const query = "SELECT * FROM employee WHERE employee_id = ?"
        const [rows] = await pool.query(query,[id]);
        if(rows.length === 0){
            throw new Error("User not found");
        }
        done(null,rows[0]);
    }
    catch(error){
        done(error,null)
    }
})