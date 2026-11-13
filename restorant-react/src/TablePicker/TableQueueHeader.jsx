import FoodDetailButton from "../FoodQueue/FoodDetailButton";
import TablePickerPilihan from "./TablePickerPilihan";

function TableQueueHeader({setExpand,expand,errorTidakPilih}){

    return(
        <section className="bg-green-800 rounded-t-2xl text-white">
            <TablePickerPilihan/>
            {errorTidakPilih && 
                <aside className="text-center">
                    <p className="text-sm text-black bg-red-300 rounded-2xl font-medium m-2">
                        <span className='text-red-500'>&#9433; </span> Harus Memilih Meja Terlebih Dahulu
                    </p>
                </aside>
            }
            <section className="text-xs w-full p-2 flex justify-end mt-1">
                <FoodDetailButton setExpand={setExpand} expand={expand} teks='Meja'/>
            </section>
        </section>
    );
}

export default TableQueueHeader;