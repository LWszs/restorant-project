import { Outlet } from "react-router-dom";
import HeaderEmployee from '../Header/HeaderEmployee.jsx'
import { OrderProvider } from "../DataContext/OrderContext.jsx";


function EmployeeLayout(){

    return(

        <OrderProvider className="flex h-dvh flex-col overflow-y-auto overflow-x-hidden">
            <HeaderEmployee/>

            <div className="min-h-0 flex-1">

                <Outlet />

            </div>
        </OrderProvider>

    );


}

export default EmployeeLayout;