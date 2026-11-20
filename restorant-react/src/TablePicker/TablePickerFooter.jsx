import { useNavigate } from "react-router-dom";
import { useOrder } from "../DataContext/OrderContext";
import axios from 'axios';


function TablePickerFooter({mejaTerpilih,setErrorTidakPilih}){

    const navigate = useNavigate();
    const {refreshMeja , setRefreshMeja} = useOrder();

    async function order(){
        if (mejaTerpilih !== 0){
            
            try{
                const updateMeja = await axios.patch("/api/meja/UpdateStatus" , {
                    meja_id : mejaTerpilih
                });
                setRefreshMeja(!refreshMeja);
                navigate("/FoodOrder");
            }
            catch(error){
                console.log(error);
            }

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
                    hover:scale-110 active:scale-105 cursor-pointer w-[50%]
                "
                onClick={order}
                >
                    Order
            </button>
        </footer>
    );
}

export default TablePickerFooter;