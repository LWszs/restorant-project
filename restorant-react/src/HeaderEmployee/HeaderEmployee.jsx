import React,{useState} from 'react'
import { Calculator, Trash2, RotateCcw, Grid } from 'lucide-react';
import {NavLink , useNavigate} from 'react-router-dom'
import LogOutReuse from '../reusable/LogOutReuse.jsx'

function HeaderEmployee(){

    const styleSpanButton = "bg-white h-0.5 w-full block transition-all";
    const styleProfileButton = "bg-green-900 border-2 w-full p-4";
    const listButtonHamburger = [
        {name: "Order" , icon: Calculator, link:"/Home"},
        {name: "Waste Management" , icon: Trash2, link:"/Waste"},
        {name: "History" , icon: RotateCcw, link:"/History"},
        {name: "List Meja" , icon: Grid, link:"/Meja"}
    ];
    
    const navigate = useNavigate();
    const [showProfile,setShowProfile] = useState(false);
    const [hamburgerActive , setHamburgerActive] = useState(false);

    const mapButtonHamburger = listButtonHamburger.map((button)=>{
        return (
            <li key={button.name} 
            className={`border-2 border-b-0 p-5 sm:p-0 sm:border-0
                ${button.name == "Order" ? "rounded-t-2xl" : ""} 
                ${button.name == "List Meja" ? "rounded-b-2xl border-b-2" : ""}`}>

                <NavLink to={button.link} className="flex items-center gap-2 text-white sm:text-xs md:text-lg hover:opacity-70 active:opacity-50" onClick={() => setHamburgerActive(false)}>
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

        <header className="bg-header-employee bg-center bg-cover flex justify-evenly items-center p-2 min-h-21 max-h-21 text-main font-bold relative">

            <button 
            className="w-8 flex flex-col gap-2 justify-center hover:opacity-70 active:opacity-50 sm:hidden"
            onClick={() => {setHamburgerActive(!hamburgerActive); 
                            setShowProfile(false)}}>

                <span className={`${styleSpanButton} ${hamburgerActive ? "rotate-45 translate-y-3" : ""}`}></span>
                <span className={`${styleSpanButton} ${hamburgerActive ? "opacity-0" : ""}`}></span>
                <span className={`${styleSpanButton} ${hamburgerActive ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
            <nav 
                className={`absolute -bottom-70 left-0 m-1 z-1 border-2 rounded-2xl bg-green-900 sm:hidden
                transition-all duration-300 ${hamburgerActive ? "translate-x-0" : "-translate-x-70"}`}>
                <ul className="text-white">
                    {mapButtonHamburger}
                </ul>
            </nav>
            <h1 className="flex gap-1 items-center">
                <img src="/header/logo.jpg" alt="logo" width={50} className="rounded-full"/>
                <div className="text-white text-md flex flex-col">
                    <span className="">Global Bites</span>
                    <span className="text-xs">Flavors of the world</span>
                </div>
            </h1>

            <nav className='hidden sm:block'>
                <ul className='flex gap-3'>
                    {mapButtonHamburger}
                </ul>
            </nav>

            <button className="bg-profil-default bg-center bg-cover w-10 h-10 rounded-full hover:opacity-70 active:opacity-50 " onClick={() => {setShowProfile(!showProfile); setHamburgerActive(false)}}></button>
            <nav 
            className={`absolute z-1 -bottom-35 right-0 m-2 text-white transition-all
            ${showProfile ? "translate-x-0" : "translate-x-30"}`}>
                <button className={`${styleProfileButton} rounded-t-2xl`} onClick={profile}>Profile</button>
                <br />
                <button className={`${styleProfileButton} rounded-b-2xl`} onClick={() => LogOutReuse(navigate)}>Log Out</button>
            </nav>
        </header>

    );

}

export default HeaderEmployee;