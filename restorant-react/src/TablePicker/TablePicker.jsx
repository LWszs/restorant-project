import QueueFooter from "../FoodQueue/QueueFooter.jsx";
import TablePickerFooter from "./TablePickerFooter.jsx";
import TableQueueHeader from "./TableQueueHeader.jsx";
import TableContainer from "./TableContainer.jsx";
import TableMap from "./TableMap.jsx";
import axios from "axios";
import useAuth from "../reusable/Auth.jsx";
import { useEffect, useState } from "react";
import { useOrder } from "../DataContext/OrderContext";
import {TransformWrapper , TransformComponent} from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, ZoomOutIcon } from "lucide-react";




function TablePicker(){

    useAuth();
    
    const styleButtonTampilanTable = "border border-green-700 p-1 opacity-50 cursor-pointer hover:scale-102 active:scale-105 transition-all duration-400";
    const styleButtonTampilanTableTerpilih = "opacity-100 text-white bg-green-700";
    const styleTableMapTangga = "absolute justify-center items-center border w-35 h-60 bg-gray-200 cursor-pointer hover:scale-105 active:scale-100";
    const STYLEZOOM = "cursor-pointer hover:scale-110 active:scale-100";

    /* VARIABEL PENYIMPAN DATA */
    const [dataMeja,setDataMeja] = useState([]);
    const [tampilMeja, setTampilMeja] = useState([]);

    const [buttonTampilanTable , setButtonTampilanTable] = useState("Table Map");

    const {setRefresh} = useOrder();
    const {mejaTerpilih , setMejaTerpilih} = useOrder();
    const {lantaiMejaTerpilih , setLantaiMejaTerpilih} = useOrder();
    const {setPage} = useOrder();
    const {setDineIn} = useOrder();

    const [lantaiPilih , setLantaiPilih] = useState("Lantai 1");

    const listLantai = ["Lantai 1","Lantai 2","Lantai 3"];
    const liPenjelasan = [
        {label:"Tersedia" , style: "bg-gray-400"},
        {label:"Terpilih" , style: "bg-black-green"},
        {label:"Terisi" , style: "bg-red-600"},
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
    const RenderListMejaCard = tampilMeja.map(meja =>{
        return(
            <li key={meja.meja_id} className="w-30">
                <TableContainer {...meja} setMejaTerpilih={setMejaTerpilih} mejaTerpilih={mejaTerpilih} setLantaiMejaTerpilih={setLantaiMejaTerpilih}/>
            </li>
        );
    });

    const RenderListMejaMap = tampilMeja.map(meja =>{
        return(
            <li 
                key={meja.meja_id} 
                className={`
                    absolute     
                    ${whMeja(meja.meja_jumlahKursi)}
                `}
                style={
                    {
                        transform: `
                            translate(${meja.meja_positionX}px , ${meja.meja_positionY}px) 
                            rotate(${meja.meja_rotate}deg)
                        `
                    }
                }
            >
                <TableMap {...meja} setMejaTerpilih={setMejaTerpilih} mejaTerpilih={mejaTerpilih} setLantaiMejaTerpilih={setLantaiMejaTerpilih}/>
            </li>
        );
    });

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

    /* MENENTUKAN PANJANG DAN BESAR DARI MEJA */
    function whMeja(meja_jumlahKursi){
        if(meja_jumlahKursi === 4){
            return "bg-center bg-cover w-[165px] h-[160px]";
        }
        else if (meja_jumlahKursi === 8){
            return "bg-center bg-cover w-[389px] h-[190px]";
        }
        else{
            return `bg-center bg-cover w-113.75 h-49`;
        }

    }
    

    return(
        <main 
            className='
                font-bold
                bg-gray-100 w-dvw bg-center bg-cover flex flex-col 
                sm:flex-row h-[calc(100dvh-84px)] 
            '
        >

            <section className='flex-1 min-h-0 min-w-0 p-2 rounded-2xl flex flex-col shadow-md mt-1'>

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

                {buttonTampilanTable === "Table Card" ? 

                    <ul className="
                        grid grid-cols-2 items-center justify-items-center
                        mt-3 overflow-y-auto h-full rounded-b-2xl p-2 gap-3 
                        xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 
                        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7
                    ">
                        {RenderListMejaCard}
                    </ul>
                : 
                    
                    <div className="relative flex-1 border rounded-2xl bg-dot-grid bg-size-[20px_20px] bg-support">
                        <TransformWrapper
                            initialScale={1}
                            minScale={0.5}
                            maxScale={5}
                            centerOnInit
                        >
                            {({ zoomIn, zoomOut, resetTransform }) => (
                                <>
                                    <div 
                                        className="
                                            flex gap-3 rounded-2xl p-2 z-1 absolute bg-black-green text-white
                                            bottom-2 right-2 text-xs md:text-sm
                                        "
                                    >
                                        <button>
                                            <ZoomIn className={STYLEZOOM} onClick={() => zoomIn()}/>
                                        </button>
                                        <button>
                                            <ZoomOut className={STYLEZOOM} onClick={() => zoomOut()}/>
                                        </button>
                                        <div className="bg-gray-300 w-0.5"></div>
                                        <button className={`${STYLEZOOM} hover:bg-black-green-hover p-0.5 rounded-2xl`} onClick={() => resetTransform()}>
                                            Reset
                                        </button>
                                    </div>

                                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                                            <ul className="relative h-161 w-334 text-black-green border">
                                                
                                                <li 
                                                    className={`
                                                        ${styleTableMapTangga}
                                                        ${lantaiPilih === "Lantai 1" || lantaiPilih === "Lantai 2" ? "flex" : "hidden"}
                                                        "top-0 right-0
                                                    `}
                                                    onClick={() => {
                                                        if (lantaiPilih === "Lantai 1"){
                                                            setLantaiPilih("Lantai 2");
                                                            lantaiFilter("Lantai 2");
                                                        }
                                                        else if (lantaiPilih === "Lantai 2"){
                                                            setLantaiPilih("Lantai 3");
                                                            lantaiFilter('Lantai 3');
                                                        }
                                                    }}
                                                >
                                                    <p>Tangga Naik</p>
                                                </li>
                                                
                                                <li 
                                                    className={`
                                                        ${styleTableMapTangga}
                                                        ${lantaiPilih === "Lantai 2" || lantaiPilih === "Lantai 3" ? "flex" : "hidden"}
                                                        bottom-0
                                                    `}
                                                    onClick={() =>{
                                                        if (lantaiPilih === 'Lantai 2'){
                                                            setLantaiPilih("Lantai 1");
                                                            lantaiFilter("Lantai 1");
                                                        }
                                                        else if (lantaiPilih === "Lantai 3"){
                                                            setLantaiPilih("Lantai 2");
                                                            lantaiFilter("Lantai 2");
                                                        }
                                                    }}  
                                                >
                                                    <p>Tangga Turun</p>
                                                </li>    

                                                {RenderListMejaMap}

                                            </ul>
                                        </TransformComponent>
                                    </div>
                                </>
                            )}
                        </TransformWrapper>
                    </div>
                
                }


            </section>

            <QueueFooter QueueHeader={TableQueueHeader} setRefresh={setRefresh} Footer={TablePickerFooter} mejaTerpilih={mejaTerpilih} lantaiMejaTerpilih={lantaiMejaTerpilih}/>

        </main>
    );

}

export default TablePicker;