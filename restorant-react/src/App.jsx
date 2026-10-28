import Login from './Login/Login.jsx'
import Home from './Home/Home.jsx';
import EmployeeLayout from './EmployeeLayout/EmployeeLayout.jsx';
import Profile from './Profile/Profile.jsx'
import InsideLayout from './InsideLayout/InsideLayout.jsx'
import TablePicker from './TablePicker/TablePicker.jsx';
import {Routes,Route} from 'react-router-dom'

function App(){


  return(

    <Routes>
      <Route index element={<Login/>}/>

      <Route element={<EmployeeLayout/>}>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/TablePicker' element={<TablePicker/>}/>
      </Route>
      
      <Route element={<InsideLayout/>}>
        <Route path='/Profile' element={<Profile/>}/>
      </Route>


    </Routes>

  );

}

export default App