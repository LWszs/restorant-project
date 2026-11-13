import { useNavigate } from "react-router-dom";


function TablePickerFooter({mejaTerpilih,setErrorTidakPilih}){

    const navigate = useNavigate();

    function order(){
        if (mejaTerpilih !== 0){
            navigate("/FoodOrderDineIn");
        }
        else{
            setErrorTidakPilih(true);
        }
    }

    return(
        <footer className="bg-green-800 p-2 text-white flex flex-col items-center">
            <button 
                className="
                    bg-green-600 p-2 rounded-2xl whitespace-nowrap text-sm
                    hover:opacity-70 active:opacity-50 cursor-pointer w-[50%]
                "
                onClick={order}
                >
                    Order
            </button>
        </footer>
    );
}

export default TablePickerFooter;