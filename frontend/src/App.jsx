import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Userlogin from './pages/Userlogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Userlogin/>}/>
        <Route path='/signup' element={<UserSignUp/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignUp/>}/>

      </Routes>

    </div>
  )
}

export default App
