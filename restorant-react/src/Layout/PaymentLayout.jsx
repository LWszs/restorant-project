import { Outlet } from "react-router-dom";

function PaymentLayout(){
    return(
        <main className="p-2">
            <Outlet/>

        </main>
    );
}

export default PaymentLayout;