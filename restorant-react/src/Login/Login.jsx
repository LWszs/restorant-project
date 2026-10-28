import React, {useState,useEffect,useRef} from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

function Login(){

    //digunakan untuk variabel penyimpan 
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    //digunakan untuk fitur enter    
    const labelPassword = useRef(null);
    const buttonLogin = useRef(null);

    //digunakna untuk pengaktifan
    const [active,setActive] = useState(true); 
    const [error,setError] = useState(false);

    // Digunakan untuk navigate
    const navigate = useNavigate();

    /* Peraturan untuk username dan password */
    const peraturan1 = username.length >= 5 && username.length <= 35;
    const peraturan2 = password.length >= 4 && password.length <= 12;
    const aturan = peraturan1 && peraturan2;

    /* varaibael penyimpan pesan error */
    const [msgError, setMsgError] = useState("");

    //ketika aturan sudah benar aktifkan tomboll login
    useEffect(() =>{
        setActive(!active);
    },[aturan])

    //ketika sudah 3 detik hilangkan logo errornya
    useEffect(() => {
        let timer;
        if(error){
            timer = setTimeout(() =>{
                setError(false);
            },3000)
        }
        return() =>{
            clearTimeout(timer);
        }
    },[error])

    //cek apakah password benar atau salah
    async function authenticate(){

        try{
            const response = await axios.post('/api/employee/auth',{
                username: username,
                password: password
            })

            if (response.status >= 200 && response.status < 300){
                navigate("/Home");
            }

            else{
                throw new Error(response);
            }
        }
        catch(error){
            errorCheck(error.response.status);
            setError(true);
        }
    }

    //ketika focus di username dan menekan enter ganti ke password
    function changeFocusUser(event){
        if (event.key === "Enter"){
            event.preventDefault();
            labelPassword.current?.focus();
        }
    }

    //ketika aktikan tombol login dan masuk ke authenticate
    function checkLogin(){
        
        if (active){
            event.preventDefault();
            authenticate()
        }
    }

    //mengecek errornya jenis apa untuk tampilan error
    function errorCheck(status){
        if (status >= 400 && status <=499){
            setMsgError("INVALID DATA ERROR")
        }
        else if (status >= 500 && status <= 599){
            setMsgError("SERVER ERROR")
        };
    }

    return(
        
        <div className={styles.body}>
            <header>
                <h1 className={styles.loginHeader}>
                    <img src="/logo.jpg" alt="logo" width={100} className={styles.loginLogo}/>
                    <div className={styles.loginDescriptionContainer}>
                        <span>Global Bites</span>
                        <span className={styles.loginDescription}>Flavors of the world</span>
                    </div>
                </h1>
            </header>
            <br />
            <main className={styles.mainContainerLogin}>
                <header >
                    <h1 className={styles.headerLogin}>Login</h1>
                    <p className={styles.headerText}>Selamat Datang</p>
                </header>
                <form>
                    <div>
                        <input type="text" name="username" placeholder="Username" className={styles.inputBox} value={username} onChange={(event) => {setUsername(event.target.value)}} onKeyDown={changeFocusUser}/>
                        <br />

                        <input type="password" name='password' placeholder="Password"  className={styles.inputBox} value={password} onChange={(event) => {setPassword(event.target.value)}} ref={labelPassword}/*  onKeyDown={changeFocusPass} */ minLength={4}/>
                    </div>
                    <button className={`${styles.buttonLogin} ${active ? styles.buttonActive : ""}`} onClick={(event) => checkLogin(event)} ref={buttonLogin} type='submit'>Login</button>
                </form>
            </main>
            {error && (            
            <aside className={styles.errorBox}>
                <div className={styles.errorContainer}>
                    <p className={styles.errorTeks}>{msgError}</p>
                    <button className={styles.errorButton} onClick={() => {setError(false)}}> X </button>
                </div>
                <div className={styles.errorDuration}></div>
            </aside>)}

        </div>
    );

}

export default Login