import { Trash } from "lucide-react";

function FoodOrderQueueHeader({resetOrder,setExpand,expand}){
    return(
        <section className="bg-green-800 text-white p-1 rounded-t-2xl flex justify-between items-center">
            <button className="ml-2 cursor-pointer hover:opacity-70 active:opacity-50" onClick={resetOrder}><Trash />
                reset
            </button>
            <button
                className={`border-2 p-1 mr-2 rounded-lg text-sm transition-all duration-300 sm:hidden ${expand ? "rotate-180" : ""} cursor-pointer hover:opacity-70 active:opacity-50`}
                onClick={() => setExpand(!expand)}
            >
                &#8593;
            </button>
        </section>
    );
}

export default FoodOrderQueueHeader;