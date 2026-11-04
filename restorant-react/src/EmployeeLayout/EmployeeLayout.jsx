import { Outlet } from "react-router-dom";
import HeaderEmployee from "../HeaderEmployee/HeaderEmployee.jsx";
import { OrderProvider } from "../DataContext/OrderContext.jsx";


function EmployeeLayout(){

    return(

        <div className="flex h-dvh flex-col overflow-hidden">
            <HeaderEmployee/>

            <OrderProvider className="min-h-0 flex-1">

                <Outlet />

            </OrderProvider>
        </div>

    );


}

export default EmployeeLayout;