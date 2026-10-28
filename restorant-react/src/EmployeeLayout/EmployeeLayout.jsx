import { Outlet } from "react-router-dom";
import HeaderEmployee from "../HeaderEmployee/HeaderEmployee.jsx";


function EmployeeLayout(){

    return(

        <div className="contentContainer">
            <HeaderEmployee/>

            <div className="contentMain">

                <Outlet />

            </div>
        </div>

    );


}

export default EmployeeLayout;