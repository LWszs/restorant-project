function ListTableFunction({meja_id,meja_lantai,meja_status,setMejaTerpilih,mejaTerpilih,setLantaiMejaTerpilih}){

    /* PERATURAN UNTUK STYLE */
    const peraturanStatus = meja_status === "Terisi";
    const peraturanMejaTerpilih = mejaTerpilih === meja_id

    /* MEJA CLICK */
    function click(){
        if (!peraturanStatus){
            setMejaTerpilih(meja_id);
            setLantaiMejaTerpilih(meja_lantai);
        }
    }

    function warnaMeja(){
        if (peraturanStatus){
            return "bg-red-700 text-black";
        }
        else if (peraturanMejaTerpilih){
            return "bg-black-green text-support scale-105"
        }
        else{
            return "bg-gray-300"
        }
    }

    return {peraturanStatus , peraturanMejaTerpilih , click , warnaMeja}
}

export default ListTableFunction;