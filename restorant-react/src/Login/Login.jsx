import React, {useState,useEffect,useRef} from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

function Login(){

    const input = "border-2 rounded-xl border-black p-2"

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


    function handleSubmit(event){
        event.preventDefault();
    }

    return(
        
        <div className="min-h-screen flex justify-center items-center
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
                    <form onSubmit={(event) => handleSubmit(event)} className='flex flex-col'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' name='username' placeholder='Insert Username' required className={input}/>
                        
                        <br />

                        <label htmlFor="password">password</label>
                        <input type="password" id='password' name='password' placeholder='Insert Password' minLength="4" required className={input}/>

                        <br />

                        <button type='submit' className='bg-green-700 p-4 rounded-2xl w-[70%] mx-auto text-white'>Login</button>

                    </form>
                </section>
            </div>
        </div>
    );

}

export default Login