import { createContext,useContext, useState , useEffect} from "react";
import axios from "axios";

const OrderContext = createContext(null);

export function OrderProvider({children}) {


    const [orderData , setOrderData] = useState([]);
    const [bufferingTotal , setBufferingTotal] = useState(false);
    const [refresh , setRefresh] = useState(false);
    const [totalPrice , setTotalPrice] = useState(0);
    const [mejaTerpilih , setMejaTerpilih] = useState(0);
    const [lantaiMejaTerpilih , setLantaiMejaTerpilih] = useState(0);
    const [dineIn , setDineIn] = useState(false);

    /* LANGSUNG MENGFETCH DAN MEMUNCULKAN ORDER JIKA TERSEDIA */
    useEffect(() =>{
        const orderFetch = async() =>{
            try{
                const responseOrder = await axios.get('/api/order/getAllOrder');
                const responseTotal = await axios.get('/api/order/getTotalPrice');
                setOrderData(responseOrder.data)
                setTotalPrice(responseTotal.data[0].totalPriceOrder);
                setBufferingTotal(false)
            }
            catch(error){
                console.log(error);
            }
        }
        orderFetch();
    },[refresh]);



    return(
        <OrderContext.Provider 
            value={{
                orderData , setOrderData ,
                bufferingTotal , setBufferingTotal ,
                refresh , setRefresh , 
                totalPrice , setTotalPrice,
                mejaTerpilih , setMejaTerpilih,
                lantaiMejaTerpilih, setLantaiMejaTerpilih,
                dineIn , setDineIn
        }}>
            {children}
        </OrderContext.Provider>
    );

}

export function useOrder() {
    return useContext(OrderContext)
}