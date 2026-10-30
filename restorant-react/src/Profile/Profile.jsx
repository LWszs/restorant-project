import {React, use, useEffect, useState } from "react";
import useAuth from "../reusable/Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogOutReuse from "../reusable/LogOutReuse";
import {Lock,Eye,EyeOff} from "lucide-react";

function Profile(){

    useAuth();

    const styleDivButton = "relative border rounded-2xl p-1 bg-white text-black";
    const styleInputPass = "outline-0 text-main";
    const styleButtonEye = "absolute right-2";
    const styleButtonBackReset = "bg-green-900 rounded-2xl p-1 px-2 hover:opacity-70  active:opacity-50";
    const styleErrorPass = "text-red-500";

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
            <div className="text-main h-full text-green-main bg-white/30">
                <main className="mx-2 p-2">
                    {succesChange && <div className="">Succes Change Password</div>}
                    <section className="shadow-xl rounded-2xl p-2 relative">
                        <button className="bg-green-900 rounded-2xl p-1 px-2 text-white hover:opacity-50 active:opacity-70" onClick={() => navigate(-1)}> 
                            ← back
                        </button>

                        <div className="mt-2">
                            <figure className="flex flex-col items-center">
                                <img src="/profile/catFace.jpg" alt="Foto Profil" width={150} className="rounded-full"/>
                                <figcaption className="bg-green-900 text-white font-bold mt-1 rounded-2xl p-1 px-2">Employee Id: {data.employee_id}</figcaption>
                            </figure>

                            <section>
                                <h2 className="font-bold mt-5 text-2xl">Personal Detail</h2>
                                <br />
                                <dl>
                                    <dt><strong>Name</strong></dt>
                                    <dd>{data.employee_name}</dd>
                                    <hr />
                                    <br />

                                    <dt><strong>Place and Date Birth</strong></dt>
                                    <dd>{data.employee_birthplace} , {data.employee_datebirth}</dd>
                                    <hr />
                                    <br />

                                    <dt><strong>Religion</strong></dt>
                                    <dd>{data.employee_religion}</dd>
                                    <hr />
                                    <br />

                                    <dt><strong>Gender</strong></dt>
                                    <dd>{data.employee_gender}</dd>
                                    <hr />
                                    <br />


                                    <dt><strong>Address</strong></dt>
                                    <dd>{data.employee_address}</dd>
                                    <hr />
                                    <br />

                                    <dt><strong>Handphone Number</strong></dt>
                                    <dd>{data.employee_phoneNumber}</dd>
                                    <hr />
                                    <br />

                                    <dt><strong>Email</strong></dt>
                                    <dd>{data.employee_email}</dd>
                                    <hr />
                                    <br />
                                </dl>

                                <br />

                                <button className="bg-green-900 p-2 text-white rounded-2xl" onClick={changePassClick}>Change Password</button>
                            </section>
                        </div>

                        {passActive && 
                            <aside className="fixed top-0 inset-0 backdrop-blur-md backdrop-brightness-50 flex justify-center items-center">
                                <form 
                                onSubmit={(event) => resetPass(event)} 
                                className="bg-green-700 text-white p-2 rounded-2xl text-main font-bold">

                                    <button type="button" 
                                    className={styleButtonBackReset} 
                                    onClick={()  => setPassActive(false)}>

                                        ← back

                                    </button>

                                    <br />
                                    <br />

                                    <Lock className="w-full"/>

                                    <br />
                                    <hr />
                                    <br />

                                    <label htmlFor="oldPass">Old Password</label>
                                    <br />
                                    <div className={styleDivButton}>
                                        <input 
                                            type={showOld ? "text" : "password"} 
                                            id="oldPass" 
                                            name="oldPassword" 
                                            required 
                                            minLength={4} 
                                            value={oldPass} 
                                            onChange={(event) => setOldPass(event.target.value)} 
                                            placeholder="Input Password"
                                            className={styleInputPass}/>
                                        <button 
                                            className={styleButtonEye}
                                            type="button" 
                                            onClick={() => {setShowOld(!showOld)}}>
                                            {showOld ? <Eye/> : <EyeOff/>}
                                        </button>
                                    </div>
                                    {errorWrongPass && 
                                    <p className={styleErrorPass}>&#9433; wrong password</p>}

                                    <br />

                                    <label htmlFor="newPass">New Password</label>
                                    <br />
                                    <div className={styleDivButton}>
                                        <input 
                                            type={showNew ? "text" : "password"} 
                                            id="newPass" 
                                            name="newPassword" 
                                            required 
                                            minLength={4} 
                                            value={newPass} 
                                            onChange={(event) => setNewPass(event.target.value)} 
                                            placeholder="Input Password"
                                            className={styleInputPass}/>
                                        <button 
                                            className={styleButtonEye}
                                            type="button" 
                                            onClick={() => {setShowNew(!showNew)}}>
                                            {showNew ? <Eye/> : <EyeOff/>}
                                        </button>
                                    </div>
                                    {errorSamePass &&  
                                    <p className={styleErrorPass}>&#9433; cant change same password</p>}

                                    <br />

                                    <label htmlFor="confirmation">Confirm Password</label>
                                    <br />
                                    <div className={styleDivButton}>
                                        <input type={showConfirm ? "text" : "password"} 
                                            id="confirmation" 
                                            name="confirmationPassword"
                                            required 
                                            minLength={4} 
                                            value={confirmPass} 
                                            onChange={(event) => setConfirmPass(event.target.value)}
                                            placeholder="Input Password"
                                            className={styleInputPass}/>
                                        <button 
                                            className={styleButtonEye} 
                                            type="button" 
                                            onClick={() => {setShowConfirm(!showConfirm)}}>
                                            {showConfirm ? <Eye/> : <EyeOff/>}
                                        </button>
                                    </div>
                                    {errorMatchPass && <p>password does not match</p>}


                                    <br />

                                    <div className="w-full flex justify-around">
                                        <button 
                                            type="reset"
                                            className={styleButtonBackReset}
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
                                        <button 
                                            type="submit" className={styleButtonBackReset}>
                                                Submit
                                        </button>
                                    </div>
                                </form>
                            </aside>
                        }
                    </section>
                    <section className="shadow-2xl bg-gray-200 rounded-2xl p-2 flex flex-col items-center mt-4 gap-5">
                        <h2 className="text-2xl font-bold">Profile Activity</h2>
                        <ul className="min-h-[50dvh] shadow-2xl bg-gray-100 w-[90%] rounded-2xl">
                            
                        </ul>
                        <button className="bg-green-900 text-white rounded-2xl p-2 w-[80%]" onClick={() => LogOutReuse(navigate)}>Log Out</button>
                    </section>
                </main>
            </div>
    );
};

export default Profile;