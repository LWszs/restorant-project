import EmployeeLayout from './Layout/EmployeeLayout.jsx';
import InsideLayout from './Layout/InsideLayout.jsx';
import TablePicker from './TablePicker/TablePicker.jsx';
import PaymentLayout from './Layout/PaymentLayout.jsx';
import ButtonTablePayment from './ButtonTablePayment.jsx';
import Login from './Login/Login.jsx';
import Home from './FoodOrder/FoodOrder.jsx';
import Profile from './Profile.jsx';
import {Routes,Route} from 'react-router-dom'

function App(){


  return(

    <Routes>
      <Route path='/Login' element={<Login/>}/>

      <Route element={<EmployeeLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/TablePicker' element={<TablePicker/>}/>

        <Route element={<PaymentLayout/>}>
          <Route path='/PaymentTakeAway' element={<ButtonTablePayment page="Payment"/>}/>
        </Route>

      </Route>
      
      <Route element={<InsideLayout/>}>
        <Route path='/Profile' element={<Profile/>}/>
      </Route>


    </Routes>

  );

}

export default App