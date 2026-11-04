import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../DataContext/OrderContext";
import { ShoppingCart } from "lucide-react";
import useAuth from "../reusable/Auth";
import FoodContainer from "./FoodContainer.jsx";
import QueueFooter from "../FoodQueue/QueueFooter.jsx";
import HomeQueueHeader from "./HomeQueueHeader.jsx";
import axios from "axios";


function Home(){

    useAuth();

    /* List footer button */
    const foodButtonList = ["Semua","Main Course","Beverage","Appetizer","Dessert","Side Dish"]

    /* VARIABEL DATA YANG DIPANGGIL BE */
    const semuaFoodRef = useRef([]);
    const mainFoodRef = useRef([]);
    const beveFoodRef = useRef([]);
    const appeFoodRef = useRef([]);
    const dessFoodRef = useRef([]);
    const sideFoodRef = useRef([]);

    /* NAVIGATE */
    const navigate = useNavigate();

    /* Variabel menampung order */
    const [foodData , setFoodData] = useState([])
    const {refresh , setRefresh} = useOrder();

    /* DIGUNAKAN UNTUK MENGETAHUI JENIS MAKANAN YANG DIPILIH */
    const [title,setTitle] = useState("Semua");

    /* VARIABEL UNTUK MENSEARCH MAKANAN */
    const [search , setSearch] = useState("");

    /* BUTTON QUEUE FOOTER */
    const ButtonFooter = (<button onClick={next} className="
                            cursor-pointer hover:opacity-70 active:opacity-50
                        ">
                            <ShoppingCart />
                        </button>);

    /* MENAMPILKAN SEMUA MAKANAN YANG ADA */
    const data = foodData.map(food => {
        return(
            <li key={food.product_id} className="mb-2.5 max-w-50 w-full">
                <FoodContainer {...food} setRefresh={setRefresh}/>
            </li>
        );
    })

    /* MAP SEMUA LIST BUTTON FOOTER */
    const foodFooter = foodButtonList.map(button =>{
        return(
            <li key={button}>
                <button
                    onClick={() => {setTitle(button);cekJenisMakanan(button)}}  
                    className={`rounded-2xl p-1 ${title == button ? "bg-gray-300" : ""}`}>
                        {button}
                </button>
            </li>
        );
    })

    /* FETCH DATA SEMUA MAKANAN  */
    useEffect(() => {
        const foodDataFetch = async() => {
            try{   
                // Fetch Semua
                const responseSemua = await axios.get('/api/product/getAllData');
                semuaFoodRef.current = responseSemua.data;
                setFoodData(semuaFoodRef.current);


                const mainFoods = semuaFoodRef.current.filter((food) => food.product_category == "Main Course");
                mainFoodRef.current = mainFoods;

                const beveFoods = semuaFoodRef.current.filter((food) => food.product_category == "Beverage");
                beveFoodRef.current = beveFoods;

                const appeFoods = semuaFoodRef.current.filter((food) => food.product_category == "Appetizer");
                appeFoodRef.current = appeFoods;

                const dessFoods = semuaFoodRef.current.filter((food) => food.product_category == "Dessert");
                dessFoodRef.current = dessFoods;

                const sideFoods = semuaFoodRef.current.filter((food) => food.product_category == "Side Dish");
                sideFoodRef.current = sideFoods;

            }
            catch(error){
                console.log(error);
            }
        }
        foodDataFetch();
    },[])

    /* MENNGECEK JENIS MAKANAN */
    function cekJenisMakanan(jenis){
        
        if (jenis == "Semua"){
            setFoodData(semuaFoodRef.current);
        }

        else if (jenis == "Main Course"){
            setFoodData(mainFoodRef.current);
        }

        else if (jenis == "Beverage"){
            setFoodData(beveFoodRef.current);
        }
        else if (jenis == "Appetizer"){
            setFoodData(appeFoodRef.current);
        }
        else if (jenis == "Dessert"){
            setFoodData(dessFoodRef.current);
        }
        else if (jenis == "Side Dish"){
            setFoodData(sideFoodRef.current);
        }

    }

    /* DIGUNAKAN UNTUK MELAKUKAN SEACRH */
    function searchMenu(event){
        setSearch(event.target.value);
        const cariMenu = semuaFoodRef.current.filter((food) => ( title === "Semua" || food.product_category == title) && food.product_name.toLowerCase().includes(event.target.value.toLowerCase()))
        setFoodData(cariMenu)
    }

    /* LANJUT KE TAHAP PEMILILHAN MEJA */
    function next(){
        navigate('/TablePicker');
    }


    return (
        <main className="h-[calc(100dvh-84px)] overflow-y-hidden flex flex-col w-full sm:flex-row-reverse font-bold lg:min-h-0">

            <section className="flex flex-col min-h-0 min-w-0 grow mb-3 sm:h-[87dvh]">
                <div className="flex-1 overflow-y-auto p-4">
                    <input
                        type="text"
                        placeholder="⌕ search"
                        className="border w-full rounded-2xl p-2 mb-2"
                        value={search}
                        onChange={searchMenu}
                    />
                    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
                        {data}
                    </ul>
                </div>

                <aside className="bg-gray-400 rounded-b-2xl p-1 shrink-0">
                    <ul className="flex overflow-x-auto whitespace-nowrap gap-5 justify-start sm:justify-around">
                        {foodFooter}
                    </ul>
                </aside>
            </section>
            
            <QueueFooter setRefresh={setRefresh} QueueHeader={HomeQueueHeader} ButtonFooter={ButtonFooter}/>
        </main>
    );

}
export default Home