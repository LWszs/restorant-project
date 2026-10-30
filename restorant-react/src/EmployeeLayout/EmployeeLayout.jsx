import { Outlet } from "react-router-dom";
import HeaderEmployee from "../HeaderEmployee/HeaderEmployee.jsx";


function EmployeeLayout(){

    return(

        <div className="flex h-dvh flex-col overflow-hidden">
            <HeaderEmployee/>

            <div className="min-h-0 flex-1">

                <Outlet />

            </div>
        </div>

    );


}

export default EmployeeLayout;