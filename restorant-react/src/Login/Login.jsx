import React, {useState,useEffect,useRef} from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

function Login(){

    const input = "border-2 rounded-xl border-black p-2";

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const [showpass , setShowPass] = useState(false);

    const [infoError , setInfoError] = useState(false);

    const navigate = useNavigate();

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
            setInfoError(true);
        }
    }


    function handleSubmit(event){
        event.preventDefault();
        authenticate();
    }

    return(
        
        <div className="min-h-dvh flex justify-center items-center
            before:content-['']
            before:absolute before:inset-0 before:-z-10
            before:bg-login-main
            before:bg-cover before:bg-center before:bg-no-repeat
            before:brightness-40"
        >
            <div className='flex'>
                <section className='hidden lg:block bg-login-image border-2 w-90 rounded-l-2xl'>
                    <figure className='flex items-center justify-evenly p-2'>
                        <img src="logo.jpg" alt="logo-restorant" width={100} className='rounded-full'/>
                        <figcaption>
                            <h1 className='text-4xl font-bold text-white'>Global Bites</h1>
                            <p className='text-white text-xs'>
                                Silahkan kembali lagi ke global bites
                            </p>
                        </figcaption>
                    </figure>
                    <img src="food/nasiGoreng.jpg" alt="nasi goreng" width={300} className='block rounded-full mx-auto'/>
                </section>
                <section className='bg-login-form text-xl text-green-main font-bold p-4 rounded-2xl lg:text-2xl lg:rounded-l-none'>
                    <header className='mb-5 flex items-center justify-evenly'>
                        <img src="logo.jpg" alt="logo-restorant" width={100} className='rounded-full'/>
                        <h2 className='text-4xl'>Login</h2>
                    </header>
                    <hr />
                    {infoError &&
                        <aside className='border-2 rounded-lg my-4 text-black font-semibold p-2 text-sm'>
                            <p>
                                <span className='text-red-600'>&#9433; </span> terjadi error pada akun atau server
                            </p>
                        </aside>
                    }
                    <form onSubmit={(event) => handleSubmit(event)} className='flex flex-col mt-4'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' name='username' placeholder='Insert Username' required className={input} value={username} onChange={(event)=> setUsername(event.target.value)}/>

                        <br />

                        <label htmlFor="password">Password</label>
                        <div className="flex gap-2 items-center relative border-2 rounded-2xl p-2">
                
                            <input type={showpass ? "text" : "password"} 
                            id='password' name='password' placeholder='Insert Password' minLength="4" className='border-none outline-none w-[80%]' 
                            required 
                            value={password} 
                            onChange={(event) => setPassword(event.target.value)}/>

                            <button type='button' className='cursor-pointer hover:opacity-70 active:opacity-50 absolute right-5' onClick={() => setShowPass(!showpass)}>
                                {showpass ? <EyeOff/> :<Eye/>}
                            </button>
                        </div>

                        <br />

                        <button type='submit' className='bg-green-700 p-4 rounded-2xl w-[70%] mx-auto text-white hover:bg-green-500 active:bg-green-800'>Login</button>

                    </form>
                </section>
            </div>
        </div>
    );

}

export default Login