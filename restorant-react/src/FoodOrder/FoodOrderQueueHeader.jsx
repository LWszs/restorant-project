import { Trash } from "lucide-react";
import FoodDetailButton from "../FoodQueue/FoodDetailButton";
import { useOrder } from "../DataContext/OrderContext";
import TablePickerPilihan from "../TablePicker/TablePickerPilihan";

function FoodOrderQueueHeader({resetOrder,setExpand,expand}){

    const {dineIn , setDineIn} = useOrder();

    return(
        <section className="bg-green-800 text-white p-1 rounded-t-2xl">

            {dineIn && 
                <TablePickerPilihan/>
            }

            <div className="flex items-center justify-between text-xs">
                <button 
                    className="ml-2 cursor-pointer hover:opacity-70 active:opacity-50 flex items-center gap-1" 
                    onClick={resetOrder}
                >
                    <Trash/>
                    <p>reset</p>
                </button>

                <FoodDetailButton setExpand={setExpand} expand={expand} teks='Pesanan'/>
            </div>
        
        </section>
    );
}

export default FoodOrderQueueHeader;