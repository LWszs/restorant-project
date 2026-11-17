import QueueFooter from "../FoodQueue/QueueFooter.jsx";
import TablePickerFooter from "./TablePickerFooter.jsx";
import TableQueueHeader from "./TableQueueHeader.jsx";
import TableContainer from "./TableContainer.jsx";
import axios from "axios";
import useAuth from "../reusable/Auth.jsx";
import { useEffect, useState } from "react";
import { useOrder } from "../DataContext/OrderContext";


function TablePicker(){

    useAuth();
    
    const styleButtonTampilanTable = "border border-green-700 p-1 opacity-50 cursor-pointer hover:scale-102 active:scale-105 transition-all duration-400";
    const styleButtonTampilanTableTerpilih = "opacity-100 text-white bg-green-700";

    /* VARIABEL PENYIMPAN DATA */
    const [dataMeja,setDataMeja] = useState([]);
    const [tampilMeja, setTampilMeja] = useState([]);

    const [buttonTampilanTable , setButtonTampilanTable] = useState("Table Map");

    const {refresh , setRefresh} = useOrder();
    const {mejaTerpilih , setMejaTerpilih} = useOrder();
    const {lantaiMejaTerpilih , setLantaiMejaTerpilih} = useOrder();
    const {setPage} = useOrder();
    const {setDineIn} = useOrder();

    const [lantaiPilih , setLantaiPilih] = useState("Lantai 1");

    const listLantai = ["Lantai 1","Lantai 2","Lantai 3"];
    const liPenjelasan = [
        {label:"Tersedia" , style: "bg-gray-400"},
        {label:"Terpilih" , style: "bg-green-400"},
        {label:"Terisi" , style: "bg-red-400"},
    ];

    /* FETCH DATA MEJA */
    useEffect(() => {
        const dataMeja = async() =>{
            try{
                const response = await axios.get("/api/meja/ambilSemuaData");
                setDataMeja(response.data);
                const dataMejaFilter = response.data.filter((meja) =>{
                    return meja.meja_lantai === "Lantai 1";
                });
                setTampilMeja(dataMejaFilter);
            }
            catch(error){
                console.log(error);
            }
        }
        dataMeja()
    },[])

    /* Jika memasuki page List Meja langsung setPage menjadi List Meja dan Dine In True */
    useEffect(() => {

        setPage("List Meja");
        setDineIn(true);

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
                    transition-all duration-500
                    min-w-[10%]
                    ${lantaiPilih == lantai ? 
                        "bg-black-green text-white p-1 rounded-2xl scale-110" : 
                        "bg-gray-300 p-1 rounded-2xl opacity-50 hover:scale-103 active:scale-120"}
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
        if (lantai === "Table Card"){
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
        <main className='bg-gray-100 w-screen bg-center bg-cover flex flex-col sm:flex-row h-[calc(100dvh-84px)] font-bold'>

            <section className='flex-1 min-h-0 p-2 rounded-2xl flex flex-col shadow-md sm:h-[86vh] mt-1'>

                <h2 className="
                    text-xl mb-2 mt-2
                    flex justify-around items-center
                ">
                    <p className="text-black-green">
                        Pilih Area & Meja
                    </p>

                    <div className="
                        flex text-xs
                    ">
                        <button 
                            className={`
                                rounded-l-lg
                                ${styleButtonTampilanTable} 
                                ${buttonTampilanTable === "Table Card" ? styleButtonTampilanTableTerpilih : ""}
                            `}
                            onClick={() => setButtonTampilanTable("Table Card")}
                        >
                            Table Card
                        </button>

                        <button 
                            className={`
                                rounded-r-lg
                                ${styleButtonTampilanTable}
                                ${buttonTampilanTable === "Table Map" ? styleButtonTampilanTableTerpilih : ""}
                            `}
                            onClick={() => setButtonTampilanTable("Table Map")}
                        >
                            Table Map
                        </button>

                    </div>

                </h2>

                <section className="flex justify-around text-sm gap-2 my-1">
                    {buttonPilihLantai}
                </section>

                <hr />

                <section className="mt-1">
                    <ul className="flex justify-evenly bg-petunjuk-warna p-1 rounded-2xl text-xs gap-2">
                        {renderLiPenjelasan}
                    </ul>
                </section>

                <ul className="
                    grid grid-cols-2 justify-items-center gap-3 
                    mt-3 overflow-y-auto h-full rounded-b-2xl p-2 
                    xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 
                    lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7
                ">
                    {RenderListMeja}
                </ul>

            </section>

            <QueueFooter QueueHeader={TableQueueHeader} setRefresh={setRefresh} Footer={TablePickerFooter} mejaTerpilih={mejaTerpilih} lantaiMejaTerpilih={lantaiMejaTerpilih}/>

        </main>
    );

}

export default TablePicker;