import { Outlet } from "react-router-dom";

function PaymentLayout(){
    return(
        <main>
            <Outlet/>
        </main>
    );
}

export default PaymentLayout;