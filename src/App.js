import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Service from './ComponentUser/Services/Services'
import LoginUser from './ComponentUser/Login/Signin'
import LoginPro from './ComponentProvider/Login/Login'
import SignInUser from './ComponentUser/Login/Signup'
import SignInPro from './ComponentProvider/Login/Register'
import Home from './ComponentCommon/Home/Home';
import Nav from './ComponentCommon/Nav/Nav';
import Footer from './ComponentCommon/Footer/Footer'
import './Css/index.css'
import './Css/card.css'
import './Css/search.css'

const App=()=>{
   
    
    return (
    <>
        <Nav />
        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/signin' Component={LoginUser}/>
            <Route path='/signup' Component={SignInUser}/>
            <Route path='/login' Component={LoginPro}/>
            <Route path='/register' Component={SignInPro}/>
            <Route path='/dashboard' Component={SignInPro}/>
            <Route path='/Service/:id' Component={Service}/>
        </Routes>
        <Footer id="footer" />
    </>
    )
}

export default App;