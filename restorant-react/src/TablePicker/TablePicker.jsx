import { useEffect, useState } from "react";
import { Armchair,Loader2 } from "lucide-react";
import TableContainer from "./TableContainer.jsx";
import FormatLengkap from "../reusable/RupiahFormat";
import { useOrder } from "../DataContext/OrderContext";
import FoodQueue from "../FoodQueue/FoodQueue";
import axios from "axios";

function TablePicker(){

    /* VARIABEL PENYIMPAN DATA */
    const [dataMeja,setDataMeja] = useState([]);
    const [tampilMeja, setTampilMeja] = useState([]);

    const {orderData , setOrderData} = useOrder();
    const {refresh , setRefresh} = useOrder();
    const {bufferingTotal , setBufferingTotal} = useOrder();
    const {totalPrice , setTotalPrice} = useOrder();

    const [expand , setExpand] = useState(false);

    /* VARIABEL MEJA TERPILIH */
    const [mejaTerpilih , setMejaTerpilih] = useState(0);
    const [lantaiMejaTerpilih , setLantaiMejaTerpilih] = useState(0);
    const [lantaiPilih , setLantaiPilih] = useState("Semua");

    const listLantai = ["Semua","Lantai 1","Lantai 2","Lantai 3"];
    const liPenjelasan = [
        {label:"Tersedia" , style: "bg-green-400"},
        {label:"Terisi" , style: "bg-gray-500"},
        {label:"Terpilih" , style: "bg-black-green"},
    ]; 

    /* FETCH DATA MEJA */
    useEffect(() => {
        const dataMeja = async() =>{
            try{
                const response = await axios.get("/api/meja/ambilSemuaData");
                setDataMeja(response.data);
                setTampilMeja(response.data);
            }
            catch(error){
                console.log(error);
            }
        }
        dataMeja()
    },[])

    /* RENDERING LIST MEJA*/
    const RenderListMeja = tampilMeja.map(meja =>{
        return(
            <li key={meja.meja_id}>
                <TableContainer {...meja} setMejaTerpilih={setMejaTerpilih} mejaTerpilih={mejaTerpilih} setLantaiMejaTerpilih={setLantaiMejaTerpilih}/>
            </li>
        );
    })

    /* RENDER LIST PENJELASAN */
    const renderLiPenjelasan = liPenjelasan.map((penjelasan) => {
        return (
            <li key={penjelasan.label} className="flex flex-row items-center gap-1.5">
                <div className={`w-2 h-2 rounded-2xl ${penjelasan.style}`}></div>
                {penjelasan.label}
            </li>
        );
    })

    /* RENDER LIST LANTAI */
    const buttonPilihLantai = listLantai.map((lantai) =>{
        return(
            <button key={lantai}
                className={
                    lantaiPilih == lantai ? "bg-black-green text-white p-1 rounded-2xl" : 
                    "bg-gray-300 p-1 rounded-2xl opacity-50 hover:opacity-100 active:opacity-70"
                } 
                onClick={() => {
                    setLantaiPilih(lantai); 
                    lantaiFilter(lantai)}}>
                {lantai}
            </button>
        );
    });

    /* RENDER LIST ORDER */
    const renderOrderData = orderData.map((order) =>{
        return(
            <li key={order.orderCart_id}>
                <FoodQueue {...order} setRefresh={setRefresh} setBufferingTotal={setBufferingTotal}/>
            </li>
        );
    });

    /* PEMILIHAN LANTAI BERDASARKAN TOMBOL */
    function lantaiFilter(lantai){
        if (lantai === "Semua"){
            setTampilMeja(dataMeja);
        }
        else{
            const dataMejaFilter = dataMeja.filter((meja) =>{
                return meja.meja_lantai === lantai;
            });
            setTampilMeja(dataMejaFilter);
        }
    }
    

    return(
        <main className='bg-gray-100 w-screen bg-center bg-cover flex flex-col h-[calc(100dvh-84px)] font-bold'>
            <aside className='
                        m-3 text-m flex justify-center gap-2 bg-pemilihan-pembelian 
                        p-3 rounded-2xl whitespace-nowrap'>

                <button className="bg-black-green p-2 text-white rounded-2xl
                        hover:bg-black-green-hover active:bg-black-green-active">
                    Memilih Meja
                </button>

                <span className="bg-black h-full w-0.5"></span>

                <button className="bg-gray-300 p-2 rounded-2xl opacity-50 hover:opacity-100 active:opacity-70">Bawa Pulang</button>

            </aside>

            <section className='grow shadow-md p-3 rounded-2xl overflow-auto'>
                <h2 className="text-xl mb-4 text-black-green">Pilih Area & Meja</h2>
                <section className="flex justify-evenly m-1 text-sm gap-2">
                    {buttonPilihLantai}
                </section>
                <hr />
                <section className="mt-2">
                    <ul className="flex justify-evenly bg-petunjuk-warna p-2 rounded-2xl text-sm gap-2">
                        {renderLiPenjelasan}
                    </ul>
                </section>
                <ul className="flex flex-wrap m-1 justify-center gap-3 mt-3">
                    {RenderListMeja}
                </ul>
            </section>

            <section className="bg-green-800 text-white mt-2 rounded-t-2xl shrink-0"> 
                <section className="m-2">
                    <section className={`
                        flex gap-2 justify-center rounded-2xl 
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
                            <p>Rekap Pesanan ({orderData.length})</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="
                            hover:opacity-50 active:opacity-70 cursor-pointer" 
                            onClick={() => setExpand(!expand)}>
                                Detail Pesanan
                            </button>
                            <p className={`transition-all duration-500 ${expand ? "rotate-180" : ""}`}>
                                &#9650;
                            </p>
                        </div>
                    </section>
                </section>
                <ul className={`bg-gray-200 text-black h-50 overflow-y-auto border border-green-600
                    transition-all duration-500 ${expand ? "max-h-100" : "max-h-0"}`}>
                    {renderOrderData}
                </ul>
                <footer className="flex m-2 items-center justify-between">
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
                        <button className="
                            bg-green-600 p-1 px-2 rounded-2xl whitespace-nowrap text-sm
                            hover:opacity-70 active:opacity-50 cursor-pointer
                            ">
                                Payment
                        </button>
                </footer>
            </section>
        </main>
    );

}

export default TablePicker;