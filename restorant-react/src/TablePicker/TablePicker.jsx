import { useEffect, useState } from "react";
import TableContainer from "./TableContainer.jsx";
import TableQueueHeader from "./TableQueueHeader.jsx";
import TablePickerButton from "./TablePickerButton.jsx";
import QueueFooter from "../FoodQueue/QueueFooter.jsx";
import { useOrder } from "../DataContext/OrderContext";
import axios from "axios";

function TablePicker(){

    /* VARIABEL PENYIMPAN DATA */
    const [dataMeja,setDataMeja] = useState([]);
    const [tampilMeja, setTampilMeja] = useState([]);

    const {refresh , setRefresh} = useOrder();

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
                className={`
                    min-w-[10%]
                    ${lantaiPilih == lantai ? 
                        "bg-black-green text-white p-1 rounded-2xl" : 
                        "bg-gray-300 p-1 rounded-2xl opacity-50 hover:opacity-100 active:opacity-70"}
                `} 
                onClick={() => {
                    setLantaiPilih(lantai); 
                    lantaiFilter(lantai)}}>
                {lantai}
            </button>
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
        <main className='bg-gray-100 w-screen bg-center bg-cover flex flex-col sm:flex-row-reverse h-[calc(100dvh-84px)] font-bold'>

            <section className='flex-1 min-h-0 p-3 rounded-2xl flex flex-col shadow-md sm:h-[86vh] mt-2'>

                <aside className='
                        text-m flex justify-around gap-2 bg-pemilihan-pembelian 
                        rounded-2xl whitespace-nowrap p-2'>

                    <button className="bg-black-green p-2 text-white rounded-2xl
                            hover:bg-black-green-hover active:bg-black-green-active min-w-[30%]">
                        Memilih Meja
                    </button>

                    <span className="bg-black h-full w-0.5"></span>
                    
                    <button className="
                        bg-gray-300 p-2 rounded-2xl opacity-50 hover:opacity-100 active:opacity-70
                        min-w-[30%]
                    ">
                        Bawa Pulang
                    </button>

                </aside>

                <h2 className="text-xl mb-2 mt-4 text-black-green">Pilih Area & Meja</h2>
                <section className="flex justify-around text-sm gap-2 my-2">
                    {buttonPilihLantai}
                </section>

                <hr />

                <section className="mt-1">
                    <ul className="flex justify-evenly bg-petunjuk-warna p-2 rounded-2xl text-sm gap-2">
                        {renderLiPenjelasan}
                    </ul>
                </section>

                <ul className="
                    grid grid-cols-2 justify-items-center gap-3 mt-3 overflow-y-auto h-full rounded-b-2xl m-1 xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7
                ">
                    {RenderListMeja}
                </ul>

            </section>

            <QueueFooter QueueHeader={TableQueueHeader} setRefresh={setRefresh} ButtonFooter={TablePickerButton} mejaTerpilih={mejaTerpilih} lantaiMejaTerpilih={lantaiMejaTerpilih}/>

        </main>
    );

}

export default TablePicker;