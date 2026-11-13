import { useOrder } from "../DataContext/OrderContext";
import { Armchair} from "lucide-react";

function TablePickerPilihan(){

    const {mejaTerpilih , setMejaTerpilih} = useOrder();
    const {lantaiMejaTerpilih , setLantaiMejaTerpilih} = useOrder();

    return(
        <section className={`
            flex gap-2 justify-center rounded-2xl m-2
            ${mejaTerpilih === 0 ? "bg-green-900" : "bg-green-700"}
        `}>
            <Armchair height={50} width={40}/>
            <div>
                <p>Lokasi</p>
                <p>
                    {mejaTerpilih === 0 ? 
                    "Meja Belum Terpilih" : 
                    `Meja ${mejaTerpilih} (${lantaiMejaTerpilih})`}
                </p>
            </div>
        </section>
    );
}

export default TablePickerPilihan;