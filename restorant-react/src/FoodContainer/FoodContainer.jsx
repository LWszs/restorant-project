import axios from 'axios';
import styles from './FoodContainer.module.css';
import FormatLengkap from '../reusable/RupiahFormat';
import {useRef, useCallback, useState, useEffect} from 'react';
import debounce from 'lodash.debounce';
import { Loader2, QuoteIcon } from 'lucide-react';

function FoodContainer({product_id,product_name,product_price,product_img,setRefresh}){

    /* GAMBAR DARI MAKANANS */
    const img_product = `/food/${product_img}`;

    /* MENAMPILKAN QUANTITY DARI QUERY */
    const [quantity , setQuantity] = useState(0);

    /* MENAMPILKAN QUERY APA TIDAK */
    const [queryActive , setQueryActive] = useState(false);
    const [confirm , setConfirm] = useState(false)

    /* KETIKA DEBOUNCE TERJADI INI DIGUNAKAN UNTUK MENUTUP ANIMASI 00.5 DETIK SETELAH DEBOUNCE SELESAI */
    useEffect(() => {
        let timeoutId;
        if (confirm){

            timeoutId = setTimeout(() => {

                setConfirm(false);
                setQueryActive(false);

            },500);

        }

        return () =>{

            clearTimeout(timeoutId);

        }

    },[confirm])

    /* TEKS YANG DIGUNAKAN KETIKA ANIMASI LOADING */
    const loadingText = <>
                    syncing <Loader2 width={20} height={15} className={styles.bufferingAnimation}/>
                </>

    /* TEKS YANG DIGUNAKAN KETIKA ANIMASI SELESAI */
    const confirmText = <>
                    Confirm
                </>

    /* MEMESAN MAKANAN */
    async function order(newQuantity){
        try{
            const response = await axios.post('/api/order/postOrder',{
                orderCart_product : product_id,
                orderCart_quantity : newQuantity,
            })
            setRefresh(prev => !prev);
            setQuantity(0);
            setConfirm(true)
        }
        catch(error){
            console.log(error)
        }

    }

    const debounceChange = useCallback(/* CALLBACK DIGUNAKAN KETIKA BROWSER KE RENDER YANG DI DALAM CALLBACK TIDAK IKUT KE RENDER */
        debounce((newQuantity)=>{
            order(newQuantity)
        },500),
        []
    )

    const add = () => {
        setQueryActive(true);
        const newQuantity = quantity + 1
        setQuantity(newQuantity);
        debounceChange(newQuantity);
    }

    return(

        <figure className={styles.food}>
            {queryActive && 
                <div 
                    className={`${styles.bufferingContainer} ${confirm ? styles.queryConfirm :  ""}`}>
                        {confirm ? confirmText : loadingText}
                </div>
            }
            <img 
                src={img_product} 
                alt={product_name} 
                width={170} 
                className={styles.foodImg}/>
            <figcaption className={styles.foodDescription}>
                <div className={styles.nameContainer}>
                    <p 
                    className={`${styles.foodName} ${product_name.length > 15 ? styles.long : ""}`}>
                        {product_name}
                    </p>
                    <button className={styles.button} onClick={add}>+</button>
                </div>
                <p>
                    {FormatLengkap(product_price)}
                </p>
                <div className={styles.stockQueryContainer}>
                    <p className={styles.foodStock}> stock: 0</p>
                    {queryActive && <p className={styles.query}>{quantity} in query</p>}
                </div>
            </figcaption>
        </figure>

    );

}

export default FoodContainer;