import { Outlet } from "react-router-dom";
import { QrCode, CreditCard, Banknote } from 'lucide-react';
import { useOrder } from "../DataContext/OrderContext";
import PaymentQueue from "../FoodQueue/PaymentQueue";

function PaymentLayout(){

    /* STYLE */
    const styleContainer = "bg-gray-200 rounded-lg p-3 text-black-green flex flex-col gap-2";

    /* LIST OBJECT UNTUK DI RENDER */
    const listButtonPembayaran = [
        {label:"Qris" , icon:QrCode},
        {label:"Kartu" , icon:CreditCard},
        {label:"Cash" , icon:Banknote}
    ];

    /* ORDER DATA*/
    const {orderData , setOrderData} = useOrder();

    /* RENDER LIST */
    const renderButtonPembayaran = listButtonPembayaran.map((button) =>{
        return(
            <li key={button.label}>
                <button className="flex flex-col items-center bg-black-green text-white p-1 px-3 rounded-2xl">
                    <button.icon/>{button.label}
                </button>
            </li>
        );
    })

    const renderOrder = orderData.map((order) =>{
        return(
            <li key={order.orderCart_id} className="border-b border-gray-400 p-2">
                <PaymentQueue {...order}/>
            </li>
        );
    })


    return(
        <main className="p-2 flex flex-col gap-2 font-bold">
            <Outlet/>

            <section className={`${styleContainer} h-[40vh] min-h-0`}>
                <h2>Rincian Pesanan</h2>
                <hr />
                <ul className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-2">
                    {renderOrder}
                </ul>
            </section>
                
            <section className={`${styleContainer}`}>
                <h2>Metode Pembayaran</h2>
                
                <hr />

                <ul className="flex justify-around">
                    {renderButtonPembayaran}
                </ul>
            </section>

            <section>

            </section>

        </main>
    );
}

export default PaymentLayout;