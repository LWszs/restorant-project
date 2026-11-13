import { Armchair} from "lucide-react";

function TableQueueHeader({setExpand,expand,mejaTerpilih,lantaiMejaTerpilih,errorTidakPilih}){

    return(
        <section className="bg-green-800 rounded-t-2xl text-white">
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
            {errorTidakPilih && 
                <aside className="text-center">
                    <p className="text-sm text-black bg-red-300 rounded-2xl font-medium m-2">
                        <span className='text-red-500'>&#9433; </span> Harus Memilih Meja Terlebih Dahulu
                    </p>
                </aside>
            }
            <section className="text-xs w-full p-2 flex justify-end mt-1">
                <div className="flex gap-2 sm:hidden">
                    <button className="
                    hover:opacity-50 active:opacity-70 cursor-pointer" 
                    onClick={() => setExpand(!expand)}>
                        Detail Meja
                    </button>
                    <p className={`transition-all duration-500 ${expand ? "rotate-180" : ""}`}>
                        &#9650;
                    </p>
                </div>
            </section>
        </section>
    );
}

export default TableQueueHeader;