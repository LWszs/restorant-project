import { Trash } from "lucide-react";
import FoodDetailButton from "../FoodQueue/FoodDetailButton";

function FoodOrderQueueHeader({resetOrder,setExpand,expand}){
    return(
        <section className="bg-green-800 text-white p-1 rounded-t-2xl flex justify-between items-center">
            <button className="ml-2 cursor-pointer hover:opacity-70 active:opacity-50" onClick={resetOrder}><Trash />
                reset
            </button>
            <FoodDetailButton setExpand={setExpand} expand={expand} teks='Pesanan'/>
        </section>
    );
}

export default FoodOrderQueueHeader;