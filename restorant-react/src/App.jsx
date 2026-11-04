import Login from './Login.jsx';
import Home from './Home/Home.jsx';
import EmployeeLayout from './Layout/EmployeeLayout.jsx';
import Profile from './Profile.jsx';
import InsideLayout from './Layout/InsideLayout.jsx';
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