import { Armchair} from "lucide-react";

function TableQueueHeader({setExpand,expand,mejaTerpilih,lantaiMejaTerpilih,rekap}){

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
            <section className="text-xs w-full p-2 flex justify-between mt-1">
                <div>
                    <p>Rekap Meja</p>
                </div>
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