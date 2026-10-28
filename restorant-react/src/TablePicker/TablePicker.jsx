import { useEffect, useState } from "react";
import TableContainer from "../TableContainer/TableContainer";
import axios from "axios";

function TablePicker(){

    /* VARIABEL PENYIMPAN DATA */
    const [dataMeja,setDataMeja] = useState([]);
    const [tampilMeja, setTampilMeja] = useState([]);

    /* VARIABEL MEJA TERPILIH */
    const [mejaTerpilih , setMejaTerpilih] = useState(0);

    const [lantaiPilih , setLantaiPilih] = useState("Semua");

    const listLantai = ["Semua","Lantai 1","Lantai 2","Lantai 3"];

    /* VARIABEL STYLE */
    const stylePemilihanLantai = "bg-gray-300 p-1 rounded-2xl opacity-50 hover:opacity-100 active:opacity-70";
    const liPenjelasanWarna = "flex flex-row items-center gap-1.5";
    const bulatWarna = "w-2 h-2 rounded-2xl";

    const styleLantaiTerpilih = "bg-black-green text-white p-1 rounded-2xl";

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

    /* RENDERING LIST */
    const listMeja = tampilMeja.map(meja =>{
        return(
            <li key={meja.meja_id}>
                <TableContainer {...meja} setMejaTerpilih={setMejaTerpilih} mejaTerpilih={mejaTerpilih}/>
            </li>
        );
    })

    const buttonPilihLantai = listLantai.map((lantai) =>{
        return(
            <button key={lantai}
                className={
                    lantaiPilih == lantai ? styleLantaiTerpilih : stylePemilihanLantai} onClick={() => {
                        setLantaiPilih(lantai); 
                        lantaiFilter(lantai)}}>
                    {lantai}
            </button>
        );
    });

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
        <main className='bg-table-picker w-screen bg-center bg-cover flex flex-col h-[90vh]'>
            <aside className='
                        m-3 text-m flex justify-center gap-2 bg-pemilihan-pembelian 
                        p-3 rounded-2xl whitespace-nowrap'>

                <button className="bg-black-green p-2 text-white rounded-2xl
                        hover:bg-black-green-hover active:bg-black-green-active">
                    Memiilh Meja
                </button>

                <span className="bg-black h-full w-0.5"></span>

                <button className="bg-gray-300 p-2 rounded-2xl opacity-50 hover:opacity-100 active:opacity-70">Bawa Pulang</button>

            </aside>

            <section className='grow mx-2 shadow-md shadow-gray-500 p-3 rounded-2xl overflow-auto'>
                <h2 className="text-xl mb-4 text-black-green">Pilih Area & Meja</h2>
                <section className="flex justify-evenly m-1 text-sm gap-2">
                    {buttonPilihLantai}
                </section>
                <hr />
                <section className="mt-2">
                    <ul className="flex justify-evenly bg-petunjuk-warna p-2 rounded-2xl text-sm gap-2">
                        <li className={liPenjelasanWarna}>
                            <div className={`${bulatWarna} bg-green-400`}></div>
                            Tersedia
                        </li>
                        <li className={liPenjelasanWarna}>
                            <div className={`${bulatWarna} bg-gray-500`}></div>
                            Terisi
                        </li>
                        <li className={liPenjelasanWarna}>
                            <div className={`${bulatWarna} bg-black-green`}></div>
                            Terpilih
                        </li>
                    </ul>
                </section>
                <ul className="flex flex-wrap m-1 justify-center gap-3 mt-3">
                    {listMeja}
                </ul>
            </section>
            <section className="bg-black-green text-white p-2 mt-2"> 
                <section>
                    <figure>
                        <img src="a" alt="" />
                        <figcaption>
                            <p>Pemilihan Meja</p>
                            <p>Meja 6 Lantai 1</p>
                        </figcaption>
                    </figure>
                </section>
                <ul>

                </ul>
                <footer>
                    <div>
                        <button>←</button>
                        <button>Detail Pesanan</button>
                    </div>
                    <div>
                        <p>Total Harga: 0</p>
                        <button>Konfirmasi & Bayar</button>
                    </div>
                </footer>
            </section>
        </main>
    );

}

export default TablePicker;