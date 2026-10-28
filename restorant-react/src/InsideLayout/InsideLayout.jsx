import { Outlet } from "react-router-dom";
import InsideHeader from "../InsideHeader/InsideHeader";


function InsideLayout(){

    return(

        <div className="contentContainer">

            <InsideHeader />

            <div className="contentMain">

                <Outlet/>

            </div>

        </div>

    );

}

export default InsideLayout;