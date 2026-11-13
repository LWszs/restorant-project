import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";


function FoodOrderButtonQueue(){

    /* NAVIGATE */
    const navigate = useNavigate();

    /* LANJUT KE TAHAP PEMILILHAN MEJA */
    function next(){
        navigate('/TablePicker');
    }

    return(
        <button onClick={next} className="
            cursor-pointer hover:opacity-70 active:opacity-50
        ">
            <ShoppingCart />
        </button>
    );
}

export default FoodOrderButtonQueue;