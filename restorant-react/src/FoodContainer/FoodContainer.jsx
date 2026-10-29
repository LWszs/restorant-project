import axios from 'axios';
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
                    syncing <Loader2 width={20} height={15} className="animate-spin"/>
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

        <figure className="shadow-2xl rounded-2xl p-2 bg-gray-200 font-main font-bold text-sm flex flex-col items-center lg:text-lg relative">
            {queryActive && 
                <div className={`absolute top-0 right-0 rounded-2xl p-1 flex items-center
                w-20 justify-center ${confirm ? "bg-green-600 text-white" : "bg-yellow-300"}`}>
                {confirm ? confirmText : loadingText}
                </div>
            }
            {queryActive && 
                <p className={`absolute bg-yellow-300 rounded-2xl p-1 right-0 top-10 ${quantity == 0? "hidden" : "block"}`}>
                    {quantity} in query
                </p>
            } 

            <img 
                src={img_product} 
                alt={product_name} 
                width={170} 
                className="rounded-2xl border-2 border-gray-400 sm:w-full"/>
            <figcaption className="mt-2 w-full">
                <div className='flex justify-between'>
                    <div className='max-w-[75%]'>
                        <p className="truncate">
                            {product_name}
                        </p>
                        <p>
                            {FormatLengkap(product_price)}
                        </p>
                    </div>
                    <button className="bg-green-600 p-2 rounded-lg text-white cursor-pointer hover:opacity-70 active:opacity-50" onClick={add}>+
                    </button>
                </div>
                <p className="rounded-2xl bg-gray-300 text-center mt-2"> stock: 0</p>
            </figcaption>
        </figure>

    );

}

export default FoodContainer;