import { createContext,useContext, useState } from "react";

const OrderContext = createContext(null);

export function OrderProvider({children}) {

    const [orderData , setOrderData] = useState([]);
    const [bufferingTotal , setBufferingTotal] = useState(false);
    const [refresh , setRefresh] = useState(false);

    return(
        <OrderContext.Provider value={{
            orderData , setOrderData , bufferingTotal , setBufferingTotal , refresh , setRefresh
        }}>
            {children}
        </OrderContext.Provider>
    );

}

export function useOrder() {
    return useContext(OrderContext)
}