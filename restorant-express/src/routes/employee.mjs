import { request, response, Router } from "express";
import pool from '../db.mjs';
import { comparePassword, hashPassword } from "../utils/helpers.mjs";
import '../stratergy/stratergy.mjs'
import passport from "passport";
import {checkSchema} from 'express-validator'
import {createUserValidatioinSchema,validatorCheck} from "../utils/validationSchema.mjs";
import isAuthenticated from "../utils/middleware.mjs";

const employeeRouter = Router();

/* ADD EMPLOYEE MASIH BELUM VALIDATE */
employeeRouter.post('/api/employee/add', async(request,respond) => {
    let {username,password} = request.body;
    password = hashPassword(password);

    const query = "INSERT INTO employee (employee_name,employee_password) VALUES(?,?)";
    await pool.query(query,[username,password]);

    respond.status(201).json({
        succes:true,
        message:"Produk berhasil dimasukkan",
    });

});

/* LOGIN EMPLOYEE */
employeeRouter.post('/api/employee/auth', checkSchema(createUserValidatioinSchema),validatorCheck,passport.authenticate("local") ,(request,respond) =>{
    respond.sendStatus(200);
});

/* MENGECEK APAKAH BENERAN EMPLOYEE */
employeeRouter.get('/api/employee/check', isAuthenticated, (request,respond) =>{
    respond.sendStatus(200);
});

/* LOGOUT */
employeeRouter.get('/api/logOut', (request,respond) => {
    request.session.destroy((err) =>{
        if(err){
            return respond.sendStatus(500);
        }
        respond.clearCookie('connect.sid');
        respond.sendStatus(200);
    })
})

/* MENGAMBIL DATA */
employeeRouter.get('/api/employee/data', isAuthenticated ,(request,respond) =>{
    if (request.session.passport.user){
        /* MENGUBAH ISOSTING DATE MENJADI STRING */
        const isoString = request.user.employee_datebirth
        const newDate = new Date(isoString);
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const date = newDate.getDate();
        const stringDate = `${year}-${month}-${date}`
        request.user.employee_datebirth = stringDate;
        return respond.status(200).send(request.user);
    }
})

/* MENUGBAH PASSWORD */
employeeRouter.post('/api/employee/changePass', isAuthenticated, async(request,respond) =>{
    let {oldPass , newPass , confirmPass} = request.body;
    const employee_id = request.user.employee_id;

    /* MENGECEK APAKAH PASSWORD BARU DENGAN KONFIRMASI PASSWORD SAMA */
    if (newPass !== confirmPass){
        return respond.status(400).json({
            message: "Not Match"
        })
    }
    const dbPass = request.user.employee_password;

    /* MENGECEK APAKAH PASSWORD SAMA DENGAN PASSWORD DB */
    if (!comparePassword(oldPass,dbPass)){
        return respond.status(400).json({
            message: 'Password Wrong'
        })
    }

    /* MENEGCEK APAKAH PASSWORD BARU DENGAN PASSWORD LAMA SAMA */
    if (comparePassword(newPass,dbPass)){
        return respond.status(400).json({
            message: "Same Password"
        })
    }

    newPass = hashPassword(newPass);
    const queryUpdate = 'UPDATE employee SET employee_password = ? WHERE employee_id = ?';
    await pool.query(queryUpdate,[newPass,employee_id]);
    respond.sendStatus(200);

})

export default employeeRouter;