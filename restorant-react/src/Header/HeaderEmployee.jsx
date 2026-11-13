import {useState} from 'react'
import {Trash2, RotateCcw, Grid , Package} from 'lucide-react';
import {NavLink , useNavigate,Link} from 'react-router-dom'
import { useOrder } from '../DataContext/OrderContext.jsx';
import LogOutReuse from '../reusable/LogOutReuse.jsx'

function HeaderEmployee(){

    const styleSpanButton = "bg-white h-0.5 w-full block transition-all";
    const styleProfileButton = "bg-green-900 border-2 w-[60%] xs:w-[40%] md:w-[30%] p-4 hover:bg-green-700 active:bg-green-600";
    const listButtonHamburger = [
        {name: "List Meja" , icon: Grid, link:"/"},
        {name: "Take Away" , icon: Package, link:"/FoodOrderTakeAway"},
        {name: "Waste Management" , icon: Trash2, link:"/Waste"},
        {name: "History" , icon: RotateCcw, link:"/History"},
    ];
    
    const navigate = useNavigate();
    const [showProfile,setShowProfile] = useState(false);
    const [hamburgerActive , setHamburgerActive] = useState(false);

    const {dineIn ,setDineIn} = useOrder();

    const mapButtonHamburger = listButtonHamburger.map((button)=>{
        return (
            <li key={button.name} 
            className={`border-2 border-b-0 p-5 sm:p-0 sm:border-0
                ${button.name == "List Meja" ? "rounded-t-2xl" : ""} 
                ${button.name == "History" ? "rounded-b-2xl border-b-2" : ""}`}>

                <NavLink 
                    to={button.link} 
                    className="
                        flex items-center gap-2 
                        text-white 
                        sm:text-xs xl:text-xl
                        hover:opacity-70 active:opacity-50
                    " 
                    onClick={() => {
                            setHamburgerActive(false);
                            button.name === "List Meja" ? setDineIn(true) : ""
                            button.name === "Take Away" ? setDineIn(false) : ""
                        }
                    }
                >
                    <button.icon className='sm:w-5'/> &nbsp; {button.name}

                </NavLink>
            </li>
        );
    });

    /* Masuk ke profile */
    async function profile(){
        navigate('/Profile');
    }

    return(

        <header className="bg-header-employee bg-center bg-cover flex justify-evenly items-center p-2 min-h-21 max-h-21 text-main font-bold sticky top-0 z-1">

            <button 
            className="w-8 flex flex-col gap-2 justify-center hover:opacity-70 active:opacity-50 md:hidden"
            onClick={() => {setHamburgerActive(!hamburgerActive); 
                            setShowProfile(false)}}>

                <span className={`${styleSpanButton} ${hamburgerActive ? "rotate-45 translate-y-3" : ""}`}></span>
                <span className={`${styleSpanButton} ${hamburgerActive ? "opacity-0" : ""}`}></span>
                <span className={`${styleSpanButton} ${hamburgerActive ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
            <nav 
                className={`
                    absolute md:hidden
                    top-20 left-0 z-1
                    p-2 h-[calc(100dvh-84px)] w-full
                    backdrop-blur-xs transition-all duration-500
                    ${hamburgerActive ? "translate-x-0" : "-translate-x-200"}
            `}>
                <ul className="text-white bg-green-800 rounded-2xl w-[70%] xs:w-[50%]">
                    {mapButtonHamburger}
                </ul>
            </nav>

            <h1>
                <Link to="/" className="flex gap-1 items-center">
                    <img src="/header/logo.webp" alt="logo" width={50} className="rounded-full"/>
                    <div className="text-white text-md flex flex-col">
                        <span className="">Global Bites</span>
                        <span className="text-xs">Flavors of the world</span>
                    </div>
                </Link>
            </h1>

            <nav className='hidden md:block'>
                <ul className='flex gap-3 lg:gap-20'>
                    {mapButtonHamburger}
                </ul>
            </nav>

            <button className="bg-profil-default bg-center bg-cover w-10 h-10 rounded-full hover:opacity-70 active:opacity-50" onClick={() => {setShowProfile(!showProfile); setHamburgerActive(false)}}></button>
            <nav 
                className={`
                    absolute z-1 top-20 right-0
                    p-2 text-white text-right w-full
                    h-[calc(100dvh-84px)] 
                    backdrop-blur-xs transition-all duration-500
                    ${showProfile ? "translate-x-0" : "translate-x-[100vw]"}
            `}>
                <button className={`${styleProfileButton} rounded-t-2xl`} onClick={profile}>Profile</button>
                <br />
                <button className={`${styleProfileButton} rounded-b-2xl`} onClick={() => LogOutReuse(navigate)}>Log Out</button>
            </nav>
        </header>

    );

}

export default HeaderEmployee;