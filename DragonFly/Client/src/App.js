import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import AddProperty from './components/AddProperty';
import UpdateProperty from './components/UpdateProperty';
import AddReservation from './components/AddReservation'
import SignUp from './components/Authentication/SignUp';
import Login from './components/Authentication/Login';
import HostLogin from './components/Authentication/HostLogin';
import HostSignUp from './components/Authentication/HostSignUp';
import Properties from './components/Properties';
import Reservations from './components/Reservations';
import Welcome from './components/Welcome';
import Favourites from './components/FavouriteProperty';

function App(){
  return(
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/register' element={<SignUp />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/hostlogin' element={<HostLogin />} />
      <Route path='/hostregister' element={<HostSignUp />} />
      <Route path='/addProperty' element={<AddProperty />} />
      <Route path='/updateProperty/:id' element={<UpdateProperty />} />
      <Route path='/addReservation/:id' element={<AddReservation />} />
      <Route path="/properties" element={<Properties/>}></Route>
      <Route path="/reservations" element={<Reservations/>}></Route>
      <Route path="/welcome" element={<Welcome/>}></Route>
      <Route path="/favourites" element={<Favourites/>}></Route>
    </Routes>
  );
}

export default App;