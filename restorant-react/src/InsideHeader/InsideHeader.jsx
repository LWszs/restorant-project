import {NavLink,useNavigate} from 'react-router-dom'

function InsideHeader(){

    return(

        <header className="flex items-center justify-center bg-header-employee bg-center bg-cover min-h-21 text-main font-bold">
            <NavLink className="hover:opacity-70 active:opacity-50" to='/Home'>
                <h1 className='flex gap-2'>
                    <img src="/header/logo.jpg" alt="logo" width={40} className='rounded-full block'/>
                    <div className="text-white flex flex-col">
                        <span className='text-md'>Restaurant </span>
                        <span className="text-xs">Good food, Better mood</span>
                    </div>
                </h1>
            </NavLink>
        </header>

    );
}

export default InsideHeader;