import {React, use, useEffect, useState } from "react";
import useAuth from "../reusable/Auth";
import styles from './Profile.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogOutReuse from "../reusable/LogOutReuse";

function Profile(){

    useAuth();

    /* HANDLE SHOW AND HIDE PASS */
    const [showOld,setShowOld] = useState(false);
    const [showNew,setShowNew] = useState(false);
    const [showConfirm,setShowConfirm] = useState(false);
    
    /* HANDLE CHANGE PASS*/
    const [passActive , setPassActive] = useState(false);
    const [errorMatchPass , setErorrMatchPass] = useState(false);
    const [errorWrongPass , setErrorWrongPass] = useState(false);
    const [errorSamePass , setErrorSamePass] = useState(false);

    /* VARIABEL CHANGE PASSWORD */
    const [oldPass , setOldPass] = useState("");
    const [newPass , setNewPass] = useState("");
    const [confirmPass , setConfirmPass] = useState("");

    /* HANDLE ANIMATION SUCESS */
    const [succesChange , setSuccesChange] = useState(false);


    /* TEMPAT MENYIMPAN DATA DARI DB */
    const [data , setData] = useState({});

    /* DIGUNKAN UNTUK NAVIGATE KE PAGE LAIN */
    const navigate = useNavigate();

    /* DIGUNAKAN UNTUK MENUTUP ANIMASI CHANGE PASS */
    useEffect(() => {
        let timeoutId;

        if(succesChange){
            timeoutId = setTimeout(() =>{
                setSuccesChange(false);
            },1500)
        }

        return () =>{
            clearTimeout(timeoutId)
        }

    },[succesChange])


    /* Mengambil data dari db */
    useEffect(()=>{
        const employeeGetData = async() =>{
            try{
                const response = await axios.get('/api/employee/data');
                setData(response.data);

            }
            catch(error){
                console.log(error);
            }

        }
        employeeGetData();
    },[])

    /* RESET PASSWORD */
    async function resetPass(event){
        event.preventDefault();
        if(confirmPass === newPass){
            try{
                console.log(oldPass);
                const response = await axios.post('/api/employee/changePass',{
                    oldPass : oldPass,
                    newPass : newPass,
                    confirmPass : confirmPass
                });
                setPassActive(false);
                setSuccesChange(true);
            }
            catch(error){
                /* JIKA PASSWRD SALAH */
                if (error.response.data.message == "Password Wrong"){
                    setErrorWrongPass(true);
                }
                /* JIKA PASSWRD BARU DENGAN KONFIRMASI TIDAK SAMA */
                else if (error.response.data.message == "Not Match"){
                    setErorrMatchPass(true);
                }
                /* JIKA PASSWORD BARU SAMA DENGAN PASSWORD LAMA */
                else if (error.response.data.message == "Same Password"){
                    setErrorSamePass(true);
                }
            }
            
        }
        else{
            setErorrMatchPass(true);
        }
    }

    function changePassClick(){
        window.scrollTo({
            top:0,
            behavior: "smooth"
        });
        setPassActive(true);
    }

    return(
            <div className={styles.mainContainer}>
                <main className={styles.profileContainer}>
                    {succesChange && <div className={styles.changePassSucces}>Succes Change Password</div>}
                    <section className={styles.profileMain}>
                        <button className={styles.back} onClick={() => navigate(-1)}> 
                            ← back
                        </button>
                        
                        <hr />
                        <div className={styles.profileAllDataContainer}>
                            <figure className={styles.profileImgContainer}>
                                <img src="/profile/catFace.jpg" alt="Foto Profil" width={200} className={styles.profileImg}/>
                                <figcaption className={styles.profileId}>Employee Id: {data.employee_id}</figcaption>
                            </figure>

                            <section className={styles.profileDataContainer}>
                                <h2>Personal Detail</h2>
                                <hr />
                                <br />
                                <dl className={styles.profileData}>
                                    <dt><strong>Name</strong></dt>
                                    <dd>{data.employee_name}</dd>
                                    
                                    <br />
                                    <dt><strong>Place and Date Birth</strong></dt>
                                    <dd>{data.employee_birthplace} , {data.employee_datebirth}</dd>

                                    <br />
                                    <dt><strong>Religion</strong></dt>
                                    <dd>{data.employee_religion}</dd>

                                    <br />
                                    <dt><strong>Gender</strong></dt>
                                    <dd>{data.employee_gender}</dd>

                                    <br />
                                    <dt><strong>Address</strong></dt>
                                    <dd>{data.employee_address}</dd>

                                    <br />
                                    <dt><strong>Handphone Number</strong></dt>
                                    <dd>{data.employee_phoneNumber}</dd>

                                    <br />
                                    <dt><strong>Email</strong></dt>
                                    <dd>{data.employee_email}</dd>
                                </dl>

                                <br />

                                <button className={styles.Button} onClick={changePassClick}>Change Password</button>
                            </section>
                        </div>
                        {passActive && 
                            <aside className={styles.resetPassContainer}>
                                <form onSubmit={(event) => resetPass(event)} className={styles.changePassForm}>
                                    <button type="button" onClick={()  => setPassActive(false)}>← back</button>

                                    <br />
                                    <br />

                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="36" 
                                        height="36" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="#405D4C" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                        <rect x="9" y="11" width="6" height="5" rx="1"/>
                                        <path d="M10 11V9a2 2 0 0 1 4 0v2"/>
                                    </svg>         


                                    <br />
                                    <br />

                                    <label htmlFor="oldPass">Old Password</label>
                                    <br />
                                    <input 
                                        type={showOld ? "text" : "password"} 
                                        id="oldPass" 
                                        name="oldPassword" 
                                        required 
                                        minLength={4} 
                                        value={oldPass} 
                                        onChange={(event) => setOldPass(event.target.value)} 
                                        placeholder="Input Password"/>
                                    <button 
                                        className={styles.seePass} 
                                        type="button" 
                                        onClick={() => {setShowOld(!showOld)}}>
                                        {showOld ? "Hide" : "Show"}
                                    </button>
                                    {errorWrongPass && <p>wrong password</p>}

                                    <br />
                                    <br />

                                    <label htmlFor="newPass">New Password</label>
                                    <br />
                                    <input 
                                        type={showNew ? "text" : "password"} 
                                        id="newPass" 
                                        name="newPassword" 
                                        required 
                                        minLength={4} 
                                        value={newPass} 
                                        onChange={(event) => setNewPass(event.target.value)} 
                                        placeholder="Input Password"/>
                                    <button 
                                        className={styles.seePass} 
                                        type="button" 
                                        onClick={() => {setShowNew(!showNew)}}>
                                        {showNew ? "Hide" : "Show"}
                                    </button>
                                    {errorSamePass && <p>cant change same password</p>}

                                    <br />
                                    <br />

                                    <label htmlFor="confirmation">Confirm Password</label>
                                    <br />
                                    <input type={showConfirm ? "text" : "password"} 
                                        id="confirmation" 
                                        name="confirmationPassword"
                                        required 
                                        minLength={4} 
                                        value={confirmPass} 
                                        onChange={(event) => setConfirmPass(event.target.value)}
                                        placeholder="Input Password"/>
                                    <button 
                                        className={styles.seePass} 
                                        type="button" 
                                        onClick={() => {setShowConfirm(!showConfirm)}}>
                                        {showConfirm ? "Hide" : "Show"}
                                    </button>
                                    <br />
                                    {errorMatchPass && <p>password does not match</p>}


                                    <br />
                                    <br />

                                    <button 
                                        type="reset" 
                                        onClick={() => {
                                            setOldPass("");
                                            setNewPass("");
                                            setConfirmPass("");
                                            setErorrMatchPass(false);
                                            setErrorWrongPass(false);
                                            setShowConfirm(false);
                                            setShowNew(false);
                                            setShowOld(false);
                                            setErrorSamePass(false)}}>
                                            Reset
                                    </button>
                                    <button type="submit">Submit</button>
                                </form>
                            </aside>
                        }
                    </section>
                    <section className={styles.profileActivityContainer}>
                        <h2>Profile Activity</h2>
                        <hr />
                        <br />
                        <ul className={styles.profileActivitylistContainer}>
                            
                        </ul>
                        <button className={styles.LogOut} onClick={() => LogOutReuse(navigate)}>Log Out</button>
                    </section>
                </main>
            </div>
    );
};

export default Profile;