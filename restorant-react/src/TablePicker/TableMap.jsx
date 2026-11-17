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

    function whMeja(){
        if(meja_jumlahKursi === 4){
            return "w-50 h-40"
        }
        else if (meja_jumlahKursi === 8){
            return "w-80 h-40"
        }
        else{
            return "w-140 h-40"
        }

    }

    return(

        <div className={`
            flex justify-center items-center rounded-full bg-green-300
            ${whMeja()}
        `}>
            <p>{meja_jumlahKursi}</p>
        </div>

    );

}

export default TableMap;