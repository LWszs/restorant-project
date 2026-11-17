import { useEffect } from "react";
import { useOrder } from "../DataContext/OrderContext";
import { useNavigate } from "react-router-dom";

function cekPage(pageNow){

    const {page } = useOrder();
    const navigate = useNavigate();

    useEffect(() =>{
        if (pageNow === false){
            pageNow = "Take Away";
        }

        if (pageNow === true){
            return;
        }
        else if(page !== pageNow){
            navigate("/");
        }

    });

}

export default cekPage;