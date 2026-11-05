import EmployeeLayout from './Layout/EmployeeLayout.jsx';
import InsideLayout from './Layout/InsideLayout.jsx';
import TablePicker from './TablePicker/TablePicker.jsx';
import Login from './Login.jsx';
import Home from './Home/Home.jsx';
import Profile from './Profile.jsx';
import {Routes,Route} from 'react-router-dom'
import PaymentLayout from './Layout/PaymentLayout.jsx';

function App(){


  return(

    <Routes>
      <Route path='/Login' element={<Login/>}/>

      <Route element={<EmployeeLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/TablePicker' element={<TablePicker/>}/>

        <Route element={<PaymentLayout/>}>
          <Route path='/PaymentTakeAway' element={null}/>
        </Route>

      </Route>
      
      <Route element={<InsideLayout/>}>
        <Route path='/Profile' element={<Profile/>}/>
      </Route>


    </Routes>

  );

}

export default App