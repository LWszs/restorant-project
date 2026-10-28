import { useEffect, useRef, useState } from "react";
import useAuth from "../reusable/Auth";
import FormatLengkap from "../reusable/RupiahFormat";
import FoodContainer from "../FoodContainer/FoodContainer";
import FoodQueue from "../FoodQueue/FoodQueue";
import styles from './Home.module.css';
import axios from "axios";
import {Trash,Utensils, CupSoda, Salad, CakeSlice, Soup, ShoppingCart, Loader2} from 'lucide-react';
import { useNavigate } from "react-router-dom";

function Home(){

    useAuth();

    /* VARIABEL DATA YANG DIPANGGIL BE */
    const semuaFoodRef = useRef([]);
    const mainFoodRef = useRef([]);
    const beveFoodRef = useRef([]);
    const appeFoodRef = useRef([]);
    const dessFoodRef = useRef([]);
    const sideFoodRef = useRef([]);

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
            <li key={food.product_id} className={styles.listFood}>
                <FoodContainer {...food} setRefresh={setRefresh}/>
            </li>
        );
    })

    /* MENAMPILKAN SEMUA ORDER YANG ADA */
    const orderList = orderData.map(order =>{
        return(
            <li key={order.orderCart_id} className={styles.listOrder}>
                <FoodQueue {...order} setRefresh={setRefresh} setBufferingTotal={setBufferingTotal}/>
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


    return(
        <main className={styles.homeMain}>
            <section className={styles.homeMenuContainer}>
                <div className={styles.homeMenu}>
                    <div className={styles.imgHolder}>
                        <input type="text" placeholder="⌕ search" className={styles.foodSearch} value={search} onChange={(event) => searchMenu(event)}/>
                        <ul className={styles.foodContainer}>
                            {data}
                        </ul>
                    </div>
                    <footer className={styles.homeMenuFooter}>
                        <nav className={styles.foodFooterContainer}>
                            <ul className={styles.foodFooter}>
                                <li>
                                    <button
                                        onClick={() => {setTitle("Semua");cekJenisMakanan("Semua")}}  
                                        className={title === 'Semua' ? styles.active : ''}>
                                            Semua
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => {setTitle("Main Course");cekJenisMakanan("Main Course")}}  
                                        className={title === 'Main Course' ? styles.active : ''}>
                                            <Utensils className={styles.navIcon}/> Main
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => {setTitle("Beverage"); cekJenisMakanan("Beverage")}}  
                                        className={title === 'Beverage' ? styles.active : ''}>
                                            <CupSoda className={styles.navIcon}/> Beverage
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => {setTitle("Appetizer");cekJenisMakanan("Appetizer")}}  
                                        className={title === 'Appetizer' ? styles.active : ''}>
                                            <Salad className={styles.navIcon}/> Appetizer
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => {setTitle("Dessert");cekJenisMakanan("Dessert")}}
                                        className={title === 'Dessert' ? styles.active : ''}>
                                            <CakeSlice className={styles.navIcon}/> Dessert
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => {setTitle("Side Dish");cekJenisMakanan("Side Dish")}}  
                                        className={title === 'Side Dish' ? styles.active : ''}>
                                            <Soup className={styles.navIcon}/>Side Dish
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </footer>
                </div>
            </section>
            <section className={styles.homeQueue}>
                <section className={styles.homeQueueHeader}>
                    <nav className={styles.foodQueueNav}>
                        <button className={styles.homeQueueHeaderButton} onClick={resetOrder}><Trash/>reset</button>
                    </nav>
                </section>
                <ul className={styles.homeQueueListContainer}>
                    {orderList}
                </ul>
                <footer className={styles.homeQueueFooter}>
                    <p className={styles.homeQueueFooterTotal}>
                        {bufferingTotal ? <Loader2 className={styles.bufferingPrice}/>: `Total Price: ${FormatLengkap(totalPrice)}`}
                    </p>
                    { orderList.length > 0 ? <button onClick={next}><ShoppingCart/></button> : ""}
                </footer>
            </section>
        </main>

    );

}
export default Home