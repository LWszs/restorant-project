import { Outlet } from "react-router-dom";
import InsideHeader from "../InsideHeader/InsideHeader";


function InsideLayout(){

    return(

        <div className="min-h-dvh flex flex-col">

            <InsideHeader />

            <div className="grow min-h-0 min-w-0">

                <Outlet/>

            </div>

        </div>

    );

}

export default InsideLayout;