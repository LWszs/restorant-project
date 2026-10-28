import {Armchair,Lock} from 'lucide-react'
import { useState } from 'react';

function TableContainer({meja_id,meja_no,meja_lantai,meja_jumlahKursi,meja_status,setMejaTerpilih,mejaTerpilih}){

    /* PERATURAN UNTUK STYLE */
    const peraturanStatus = meja_status !== "Terisi";
    const peraturanMejaTerpilih = mejaTerpilih === meja_id

    /* MEJA CLICK */
    function click(){
        if (peraturanStatus){
            setMejaTerpilih(meja_id);
        }
    }

    return(

        <div className={`flex flex-col justify-center shadow-md shadow-gray-500 rounded-2xl text-m w-30 gap-2 p-2 ${peraturanStatus ? "hover:border-2 active:border-green-400" : "opacity-50"} ${peraturanMejaTerpilih ? "border-2 border-green-600 bg-green-200" : ""}`} onClick={click}>
            
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