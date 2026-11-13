import {Loader2} from 'lucide-react';
import { useOrder } from '../DataContext/OrderContext';
import { useState } from 'react';
import axios from 'axios';
import FormatLengkap from "../reusable/RupiahFormat";
import FoodQueue from './FoodQueue';


function QueueFooter({setRefresh,refresh,QueueHeader,Footer,mejaTerpilih,lantaiMejaTerpilih}){


    const [expand , setExpand] = useState(false);

    /* CONTEXT ORDER */
    const {orderData , setOrderData} = useOrder();
    const {bufferingTotal , setBufferingTotal} = useOrder();
    const {totalPrice , setTotalPrice} = useOrder();

    /* MERESET/MENGHAPUS SEMUA ORDER YANG SUDAH DI ORDER */
    async function resetOrder(){
        try{
            await axios.delete('/api/order/resetOrder');
            setRefresh(!refresh);
            setTotalPrice(0);
        }
        catch(error){
            console.log(error);
        }
    }

    /* MENAMPILKAN SEMUA ORDER YANG ADA */
    const orderList = orderData.map(order =>{
        return(
            <li key={order.orderCart_id}>
                <FoodQueue {...order} setRefresh={setRefresh} setBufferingTotal={setBufferingTotal}/>
            </li>
        );
    })

    return(
        <section
            className={`flex flex-col shrink-0 overflow-hidden
                sm:max-h-none sm:max-w-75 sm:min-w-50 md:max-w-none
                lg:w-90 sm:h-[85dvh] sm:m-4 sm:rounded-b-2xl
            `}
        >
            <QueueHeader resetOrder={resetOrder} setExpand={setExpand} expand={expand} mejaTerpilih={mejaTerpilih} lantaiMejaTerpilih={lantaiMejaTerpilih} rekap={orderData.length}/>

            <ul className={`bg-gray-200 sm:hidden h-50 overflow-y-auto transition-all duration-800 ${expand ? "max-h-100" : "max-h-0"} border border-green-700`}>
                {orderList}
            </ul>
            <ul className="hidden bg-gray-200 sm:block flex-1 overflow-y-auto">
                {orderList}
            </ul>

            <Footer bufferingTotal={bufferingTotal} totalPrice={totalPrice} mejaTerpilih={mejaTerpilih}/>
        </section>
    );
}

export default QueueFooter;