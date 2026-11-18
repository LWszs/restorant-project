import {Armchair,Lock} from 'lucide-react'

function TableMap({meja_id,meja_no,meja_lantai,meja_jumlahKursi,meja_status,setMejaTerpilih,mejaTerpilih,setLantaiMejaTerpilih}){

    /* PERATURAN UNTUK STYLE */
    const peraturanStatus = meja_status !== "Terisi";
    const peraturanMejaTerpilih = mejaTerpilih === meja_id

    /* MEJA CLICK */
    function click(){
        if (peraturanStatus){
            setMejaTerpilih(meja_id);
            setLantaiMejaTerpilih(meja_lantai);
        }
    }


    return(

        <div 
            className={`
                w-full h-full
                flex flex-col justify-center items-center border rounded-xl
                hover:scale-105 active:scale-100 cursor-pointer
                ${peraturanMejaTerpilih ? "bg-green-600 text-white" : "bg-gray-300"}
            `}
            onClick={click}
        >
            <p>Meja {meja_id}</p>
            <p>Kapasitas {meja_jumlahKursi}</p>
            
        </div>
        
    );

}

export default TableMap;