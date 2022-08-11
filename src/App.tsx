import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import StationsMain from './components/StationsMain'
import StationView from './components/StationView'
import BikeRentalsMain from './components/BikeRentalsMain'
import {H1} from './styles/styles'
import {NavbarContainer,NavbarLinkContainer,NavbarLink} from './styles/styles';

const App = () => {
  
  return(
    <div>
      <H1>KAUPUNKIPYÖRÄT</H1>
      <NavbarContainer>
        <NavbarLinkContainer>
          <NavbarLink className="nav-link active" to="/home">
              Matkat
          </NavbarLink>
          <NavbarLink className="nav-link" to="/stations">
              Asemat
          </NavbarLink>
        </NavbarLinkContainer>
      </NavbarContainer>
      <Routes>
          <Route path='/stations/:id' element={<StationView/>} />
          <Route path='/stations' element={<StationsMain/>}/>
          <Route path='/home' element={<BikeRentalsMain/>}/>
          <Route path='/' element={<BikeRentalsMain/>}/>
      </Routes>
    </div>
  )
}

export default App;