import {Armchair,Lock} from 'lucide-react'

function TableContainer({meja_id,meja_no,meja_lantai,meja_jumlahKursi,meja_status,setMejaTerpilih,mejaTerpilih,setLantaiMejaTerpilih}){

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
                flex flex-col justify-center shadow-sm bg-gray-300 text-black shadow-gray-800 rounded-2xl text-m w-30 gap-2 p-2 transition-all duration-500
                ${peraturanStatus ? "hover:scale-103 active:scale-110" : "opacity-50"} 
                ${peraturanMejaTerpilih ? "bg-green-400 scale-105" : ""}
            `} 
            onClick={click}
        >
            
            <header className='flex gap-6'>
                <h3>Meja {meja_no}</h3>
                {meja_status == "Terisi" ? <Lock className='w-5'/> : ""}
            </header>
            <div className='flex justify-center opacity-50'>
                <Armchair/><Armchair/>
            </div>
            <div className='text-xs text-left'>
                <p className={`${peraturanStatus ? "bg-green-300 w-[50%]" : ""} rounded-2xl p-0.5`}>
                    {meja_jumlahKursi} Kursi
                </p>
                <p>{meja_lantai}</p>
            </div>
        </div>

    );

}

export default TableContainer;