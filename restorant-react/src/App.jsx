import EmployeeLayout from './Layout/EmployeeLayout.jsx';
import InsideLayout from './Layout/InsideLayout.jsx';
import TablePicker from './TablePicker/TablePicker.jsx';
import PaymentLayout from './Layout/PaymentLayout.jsx';
import Login from './Login/Login.jsx';
import Profile from './Profile.jsx';
import {Routes,Route} from 'react-router-dom'
import FoodOrder from './FoodOrder/FoodOrder.jsx';

function App(){


  return(

    <Routes>
      <Route path='/Login' element={<Login/>}/>

      <Route element={<EmployeeLayout/>}>
        <Route path='/FoodOrder' element={<FoodOrder/>}/>
        <Route index element={<TablePicker/>}/>

      {/*  <Route element={<PaymentLayout/>}>
          
        </Route> */}

      </Route>
      
      <Route element={<InsideLayout/>}>
        <Route path='/Profile' element={<Profile/>}/>
      </Route>


    </Routes>

  );

}

export default App