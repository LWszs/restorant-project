import styles from './InsideHeader.module.css';
import {NavLink,useNavigate} from 'react-router-dom'

function InsideHeader(){

    return(

        <header className={styles.insideHeaderContainer}>
            <h1>
                <NavLink className={styles.insideHeaderTitle} to='/Home'>
                    <img src="/header/logo.jpg" alt="logo" width={40}/>
                    <div className={styles.descriptionContainer}>
                        <span>Restaurant </span>
                        <span className={styles.logoText}>Good food, Better mood</span>
                    </div>
                </NavLink>
            </h1>
        </header>

    );
}

export default InsideHeader;