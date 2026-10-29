import FormatLengkap from '../reusable/RupiahFormat';
import { useEffect, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import {Trash} from 'lucide-react';

function FoodQueue({orderCart_id,orderCart_quantity,product_name,product_img,product_price,setRefresh,setBufferingTotal}){

    /* GAMBAR DARI MAKANAN */
    const img = `/food/${product_img}`;

    /* MENAMPILKAN HARGA DAN QUANTITY */
    const [quantity , setQuantity] = useState(orderCart_quantity);
    let totalPrice = quantity * product_price;  

    /* SETIAP KALI ORDER QUANTITY BERUBAH  = RENDER */
    useEffect(() =>{
        setQuantity(orderCart_quantity);
    },[orderCart_quantity])

    /* MENEKAN TOMBOL + AKAN MEMANGGIL DEBOUNCE YANG SIAP MENAMBAH QUANTITY */
    const addCode = () =>{
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        setBufferingTotal(true)
        debounceChange(newQuantity);
    }

    /* KETIKA MENEKAN TOMBOL - AKAN MEMANGGIL DEBOUNCE YANG SIAP MENGURANGI QUANTITY */
    const subtractCode = () =>{
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        debounceChange(newQuantity);
    }

    /* DIGUNAKAN UNTUK SETIAP KALI MEGGANTI QUANTITY DI INPUT AKAN FETCH DB TAPI DIKOMBO DENGAN DEBOUNCE AGAR TIDAK TERLALU BANYAK REQUEST */
    const onchangeCode = (event) =>{
        let newQuantity = Number(event.target.value);
        if (newQuantity <= 0){
            setQuantity(0);
            return
        }

        if (newQuantity > 0){
            setQuantity(newQuantity);
            debounceChange(newQuantity);
        }
    }

    /* MENJAGA REQUEST YANG TERLALU BANYAK */
    const debounceChange = useCallback(/* CALLBACK DIGUNAKAN KETIKA BROWSER KE RENDER YANG DI DALAM CALLBACK TIDAK IKUT KE RENDER */
        debounce((newQuantity)=>{
            changeQuantity(newQuantity)
        },500),
        []
    );

    /* FETCH DATA DB UNTUK MENGGANTI QUANTITY*/
    async function changeQuantity(newQuantity){
        try{
            const response = await axios.patch(`/api/order/addOrder/${orderCart_id}`,{
                orderCart_quantity : newQuantity,
            })
            setRefresh(prev => !prev);
        }
        catch(error){
            console.log(error);
        }

    }

    async function cancel(){
        try{
            const respone = await axios.delete(`/api/order/deleteOrder/${orderCart_id}`);
            setRefresh(prev => !prev);
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <figure className="">
            <img src={img} alt={product_name} width={90} className=""/>
            <div className="">
                <figcaption className="">
                    {product_name}
                    <div className=""> 
                        <button 
                            className="" 
                            onClick={subtractCode}> 
                            - 
                        </button>
                        <input 
                            type="number" 
                            min={1} 
                            className=""
                            value={quantity || ""} 
                            onChange={(event) => {onchangeCode(event);}}/>
                        <button 
                            className=""
                            onClick={addCode}> 
                            + 
                        </button> 
                    </div>
                    {FormatLengkap(totalPrice)}
                </figcaption>
                <button 
                    className=""
                    onClick={cancel}>
                        <abbr title="Cancel"> <Trash/> </abbr>
                </button>
            </div>
        </figure>
    );

}

export default FoodQueue;