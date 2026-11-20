import {Lock} from 'lucide-react'
import useTableFunction from './useTableFunction';

function TableMap(props){

    const {meja_id , meja_status , meja_jumlahKursi} = props
    const {peraturanStatus , peraturanMejaTerpilih , click , warnaMeja} = useTableFunction(props);

    return(

        <div 
            className={`
                w-full h-full relative
                flex flex-col justify-center items-center border rounded-xl cursor-pointer
                ${peraturanStatus ? "opacity-70" : "hover:scale-110 active:scale-100"} 
                ${warnaMeja()}
            `}
            onClick={click}
        >
            {meja_status !== "Terisi" ? 
            "" : 

                <Lock className='absolute top-8 right-8'/>
            
            }
            <p>Meja {meja_id}</p>
            <p>Kapasitas {meja_jumlahKursi}</p>
            
        </div>
        
    );

}

export default TableMap;