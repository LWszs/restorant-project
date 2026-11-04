import { createContext,useContext, useState } from "react";

const OrderContext = createContext(null);

export function OrderProvider({children}) {

    const [orderData , setOrderData] = useState([]);

    return(
        <OrderContext.Provider value={{orderData , setOrderData}}>
            {children}
        </OrderContext.Provider>
    );

}

export function useOrder() {
    return useContext(OrderContext)
}