import styles from  './HeaderEmployee.module.css';
import React,{useState} from 'react'
import { Calculator, Trash2, RotateCcw, Grid } from 'lucide-react';
import {NavLink , useNavigate} from 'react-router-dom'
import LogOutReuse from '../reusable/LogOutReuse.jsx'

function HeaderEmployee(){
    
    const navigate = useNavigate();
    const [showProfile,setShowProfile] = useState(false);
    const [hamburgerActive , setHamburgerActive] = useState(false);

    /* Masuk ke profile */
    async function profile(){
        navigate('/Profile');
    }

    return(

        <header className={styles.header}>
            <button className={styles.headerHamburger} onClick={() => {setHamburgerActive(!hamburgerActive); setShowProfile(false)}}>
                <span className={`${styles.hamburgerBar} ${styles.first} ${hamburgerActive ? styles.open : ""}`}></span>
                <span  className={`${styles.hamburgerBar}  ${styles.second} ${hamburgerActive ? styles.open : ""}`}></span>
                <span  className={`${styles.hamburgerBar}  ${styles.last} ${hamburgerActive ? styles.open : ""}`}></span>
            </button>
            <nav className={`${styles.HeaderEmployeeNav} ${hamburgerActive ? styles.open : ""}`}>
                <ul className={styles.headerListContainer}>
                    <li>
                        <NavLink to="/Home" className={styles.headerNavList} onClick={() => setHamburgerActive(false)}>
                            <Calculator/> &nbsp; Order
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={styles.headerNavList}>
                            <Trash2/> &nbsp;  Waste Management
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={styles.headerNavList}>
                            <RotateCcw/> &nbsp; History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={styles.headerNavList}>
                            <Grid/>  &nbsp; List Meja
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <h1 className={styles.headerTitle}>
                <img src="/header/logo.jpg" alt="logo" width={50} className={styles.headerLogo}/>
                <div className={styles.headerTitleText}>
                    <span className={styles.title}>Global Bites</span>
                    <span className={styles.descriptionLogo}>Flavors of the world</span>
                </div>
            </h1>
            <button className={styles.headerProfileButton} onClick={() => {setShowProfile(!showProfile); setHamburgerActive(false)}}></button>
            <nav className={`${styles.profileContainer} ${showProfile ? styles.active : ""}`}>
                <button className={styles.profile} onClick={profile}>Profile</button>
                <br />
                <button className={styles.profile} onClick={() => LogOutReuse(navigate)}>Log Out</button>
            </nav>
        </header>

    );

}

export default HeaderEmployee;