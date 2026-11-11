import { Outlet } from "react-router-dom";
import InsideHeader from "../Header/InsideHeader";


function InsideLayout(){

    return(

        <div className="flex flex-col sm:h-dvh">

            <InsideHeader/>

            <div className="flex-1 min-h-0">

                <Outlet/>

            </div>

        </div>

    );

}

export default InsideLayout;