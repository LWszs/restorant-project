import { useNavigate } from "react-router-dom";
import axios from "axios";
import {React,useEffect} from 'react'

function useAuth(){

    const navigate = useNavigate();

    useEffect(() =>{
        const employeeCheck = async() =>{
            try{
                const response = await axios.get('/api/employee/check',
                    {withCredentials:true});
            }
            catch(error){
                navigate("/")
            }
        }
        employeeCheck()

    },[]);
}

export default useAuth;
