  //MELAKUKAN LOGUT
async function LogOutReuse(navigate){
    try{
        const response = await axios.get('/api/logOut');
        if (response.status === 200){
            navigate('/');
        }
    }
    catch(error){
        navigate('/');
    }
};

export default LogOutReuse