import {NavLink,useNavigate} from 'react-router-dom'

function InsideHeader(){

    return(

        <header className="flex justify-center items-center bg-header-employee bg-center bg-cover min-h-21 text-main font-bold max-h-21">
            <NavLink className="hover:opacity-70 active:opacity-50 w-80" to='/Home'>
                <h1 className='flex gap-2 justify-center'>
                    <img src="/header/logo.jpg" alt="logo" width={50} className='rounded-full block lg:w-18'/>
                    <div className="text-white flex flex-col justify-center">
                        <span className='text-md lg:text-2xl'>Restaurant </span>
                        <span className="text-xs">Good food, Better mood</span>
                    </div>
                </h1>
            </NavLink>
        </header>

    );
}

export default InsideHeader;