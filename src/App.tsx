import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import BikeRentals from './components/BikeRentals'
import Stations from './components/Stations'
import StationView from './components/StationView'
import Home from './components/Home'

const App = () => {
  
  return(
    <div>
      <h1><a href="/" style={{textDecoration:"none"}}>Kaupunkipyörien vuokraukset</a></h1>

      <Routes>
          <Route path='/bikerentals' element={<BikeRentals/>}/>
          <Route path='/stations/:id' element={<StationView/>} />
          <Route path='/stations' element={<Stations/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/' element={<Home/>}/>
      </Routes>
      
    </div>
    
  )
  
}

export default App;