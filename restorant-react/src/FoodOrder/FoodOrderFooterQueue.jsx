import { ShoppingCart , Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormatLengkap from "../reusable/RupiahFormat";


function FoodOrderFooterQueue({bufferingTotal,totalPrice}){

    /* NAVIGATE */
    const navigate = useNavigate();

    /* LANJUT KE TAHAP PEMILILHAN MEJA */
    function next(){
        navigate('/TablePicker');
    }

    return(
        <footer className="bg-green-800 text-white flex justify-between items-center p-2">
            {bufferingTotal ? <Loader2 className="animate-spin" /> : 
                    
                <div className="flex w-[70%]">
                    <p className="whitespace-nowrap">
                        Total Price :
                    </p>
                    <p className="w-[60%] overflow-x-auto">
                        {FormatLengkap(totalPrice)}
                    </p>
                </div>
            }
            <button onClick={next} className="
                cursor-pointer hover:opacity-70 active:opacity-50
            ">
                <ShoppingCart />
            </button>
        </footer>
);
}

export default FoodOrderFooterQueue;