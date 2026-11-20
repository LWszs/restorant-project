import {Armchair,Lock} from 'lucide-react'
import useTableFunction from './useTableFunction';

function TableContainer(props){

    const {meja_id , meja_jumlahKursi , meja_lantai , meja_status} = props;
    const {peraturanStatus , peraturanMejaTerpilih , click , warnaMeja} = useTableFunction(props);

    function warnaTeksMeja(){
        if (peraturanStatus){
            return ""
        }
        else if (peraturanMejaTerpilih){
            return "bg-support text-black-green"
        }
        else{
            return "bg-green-500"
        }
    }

    return(

        <div 
            className={`
                flex flex-col justify-center shadow-sm text-black-green shadow-gray-800 rounded-2xl text-m w-30 gap-2 p-2 transition-all duration-500 cursor-pointer
                ${peraturanStatus ? "opacity-70" : "hover:scale-110 active:scale-100"} 
                ${warnaMeja()}
            `} 
            onClick={click}
        >
            
            <header className='flex gap-6'>
                <h3>Meja {meja_id}</h3>
                {meja_status == "Terisi" ? <Lock className='w-5'/> : ""}
            </header>
            <div className='flex justify-center opacity-50'>
                <Armchair/><Armchair/>
            </div>
            <div className='text-xs text-left'>
                <p className={`w-[50%] rounded-2xl p-0.5 ${warnaTeksMeja()}`}>
                    {meja_jumlahKursi} Kursi
                </p>
                <p>{meja_lantai}</p>
            </div>
        </div>

    );

}

export default TableContainer;