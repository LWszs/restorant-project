import { useEffect, useRef, useState } from "react";
import useAuth from "../reusable/Auth";
import FormatLengkap from "../reusable/RupiahFormat";
import FoodContainer from "../FoodContainer/FoodContainer";
import FoodQueue from "../FoodQueue/FoodQueue";
import axios from "axios";
import {Trash,ShoppingCart, Loader2} from 'lucide-react';
import { useNavigate } from "react-router-dom";

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

    /* Expand */
    const [expand , setExpand] = useState(false);

    /* NAVIGATE */
    const navigate = useNavigate();

    /* VARIABEL BUFFERING TOTAL PRICE*/
    const [bufferingTotal , setBufferingTotal] = useState(false);

    /* Variabel menampung order */
    const [foodData , setFoodData] = useState([])
    const [orderData , setOrderData] = useState([]);

    /* DIGUNAKAN UNTUK MENGETAHUI JENIS MAKANAN YANG DIPILIH */
    const [title,setTitle] = useState("Semua");

    /* DIGUNAKAN UNTUK  REFRESH*/
    const [refresh , setRefresh] = useState(false);

    /* MENAMPILKAN SEMUA TOTAL HARGA */
    const [totalPrice , setTotalPrice] = useState(0);

    /* VARIABEL UNTUK MENSEARCH MAKANAN */
    const [search , setSearch] = useState("");

    /* MENAMPILKAN SEMUA MAKANAN YANG ADA */
    const data = foodData.map(food => {
        return(
            <li key={food.product_id} className="mb-2.5 max-w-50 w-full">
                <FoodContainer {...food} setRefresh={setRefresh}/>
            </li>
        );
    })

    /* MENAMPILKAN SEMUA ORDER YANG ADA */
    const orderList = orderData.map(order =>{
        return(
            <li key={order.orderCart_id}>
                <FoodQueue {...order} setRefresh={setRefresh} setBufferingTotal={setBufferingTotal}/>
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

    /* LANGSUNG MENGFETCH DAN MEMUNCULKAN ORDER JIKA TERSEDIA */
    useEffect(() =>{
        const orderFetch = async() =>{
            try{
                const responseOrder = await axios.get('/api/order/getAllOrder');
                const responseTotal = await axios.get('/api/order/getTotalPrice');
                setOrderData(responseOrder.data)
                setTotalPrice(responseTotal.data[0].totalPriceOrder);
                setBufferingTotal(false)
            }
            catch(error){
                console.log(error);
            }
        }
        orderFetch();
    },[refresh])

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

    /* MERESET/MENGHAPUS SEMUA ORDER YANG SUDAH DI ORDER */
    async function resetOrder(){
        try{
            await axios.delete('/api/order/resetOrder');
            setRefresh(() => {
                setTotalPrice(0);
                return !refresh;
            });
        }
        catch(error){
            console.log(error);
        }
    }

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
        <main className="h-[calc(100dvh-84px)] min-h-dvh overflow-hidden flex flex-col w-full sm:flex-row-reverse font-bold lg:min-h-0">

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

            <section
                className={`flex flex-col shrink-0 overflow-hidden transition-all
                    sm:max-h-none sm:max-w-75 sm:min-w-50 md:max-w-none
                    ${expand ? "max-h-100" : "max-h-23"} lg:w-90 sm:h-[85dvh] sm:m-4 sm:rounded-b-2xl`}
            >
                <section className="bg-green-800 text-white p-1 rounded-t-2xl flex justify-between items-center">
                    <button className="ml-2" onClick={resetOrder}><Trash />reset</button>
                    <button
                        className={`border-2 p-1 mr-2 rounded-lg text-sm transition-all sm:hidden ${expand ? "rotate-180" : ""} cursor-pointer hover:opacity-70 active:opacity-50`}
                        onClick={() => setExpand(!expand)}
                    >
                        &#8593;
                    </button>
                </section>

                <ul className="bg-gray-200 sm:hidden h-50 overflow-y-auto">
                    {orderList}
                </ul>
                <ul className="hidden bg-gray-200 sm:block flex-1 overflow-y-auto">
                    {orderList}
                </ul>

                <footer className="bg-green-800 text-white flex justify-between p-2">
                    <p>
                        {bufferingTotal ? <Loader2 className="animate-spin" /> : `Total Price: ${FormatLengkap(totalPrice)}`}
                    </p>
                    {orderList.length > 0 && <button onClick={next}><ShoppingCart /></button>}
                </footer>
            </section>
        </main>
    );

}
export default Home