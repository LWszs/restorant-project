import {Router} from 'express';
import isAuthenticated from '../utils/middleware.mjs';
import pool from '../db.mjs';

const order = Router();

order.post('/api/order/postOrder', isAuthenticated , async(request,respond)=>{
    try{
        let {orderCart_product,orderCart_quantity} = request.body;
        const employee_id = request.user.employee_id;

        if (orderCart_quantity <= 0){
            return respond.sendStatus(400);
        }

        const queryInsert = "INSERT INTO orderCart (orderCart_employee,orderCart_product,orderCart_quantity) VALUES (?,?,?) ON DUPLICATE KEY UPDATE orderCart_quantity = orderCart_quantity + VALUES(orderCart_quantity);";
        await pool.query(queryInsert,[employee_id,orderCart_product,orderCart_quantity]);
        return respond.sendStatus(200);

    }
    catch(error){
        return respond.sendStatus(400);
    }
});

order.get('/api/order/getAllOrder', isAuthenticated , async(request,respond)=>{
    try{
        const employee_id = request.user.employee_id;
        const query = "SELECT * FROM orderCart_view WHERE orderCart_employee = ?";
        const [row] = await pool.query(query,[employee_id]);
        return respond.status(200).send(row);
    }
    catch(error){
        respond.sendStatus(400);
    }
});

order.delete('/api/order/resetOrder', isAuthenticated, async(request,respond) =>{
    try{
        const employee_id = request.user.employee_id;
        const query = "DELETE FROM orderCart WHERE orderCart_employee = ?";
        await pool.query(query,[employee_id]);
        respond.sendStatus(200);
    }
    catch(error){
        return respond.sendStatus(400);
    }
});

order.patch('/api/order/addOrder/:id', isAuthenticated, async(request,respond) =>{
    try{
        const id = request.params.id;
        const {orderCart_quantity} = request.body;
        const employee_id = request.user.employee_id;
        const queryUpdate = "UPDATE orderCart SET orderCart_quantity = ? WHERE orderCart_id = ? AND orderCart_employee = ?";
        await pool.query(queryUpdate,[orderCart_quantity,id,employee_id]);

        const queryDelete = "DELETE FROM orderCart WHERE orderCart_quantity <= ?";
        await pool.query(queryDelete,[0]);
        return respond.sendStatus(200);
    }
    catch(error){
        return respond.sendStatus(400);
    }
});

order.delete('/api/order/deleteOrder/:id', isAuthenticated, async(request,respond) =>{
    try{
        const id = request.params.id;
        const queryDelete = "DELETE FROM orderCart WHERE orderCart_id = ?";
        await pool.query(queryDelete,[id]);
        return respond.sendStatus(200);
    }
    catch(error){
        return respond.sendStatus(400);
    }
})

order.get('/api/order/getTotalPrice' , isAuthenticated , async(request,respond) =>{
    try{
        const employee_id = request.user.employee_id;
        const querySearch = "SELECT (SUM(total_price)) AS totalPriceOrder FROM orderCart_view WHERE orderCart_employee = ?"
        const [row] = await pool.query(querySearch,[employee_id]);
        return respond.send(row).status(200);
    }
    catch(error){
        return respond.sendStatus(400);
    }
})

export default order;