import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Service from '../Services/Services'
import Login from '../Login/Login'
import Loginn from '../Login/LogInn'
import SignIn from '../Login/SignIn'
import SignInn from '../Login/SignInn'
import Home from './Home';
import Nav from './Nav';
import Footer from '../Footer/Footer'
import Provider from '../Provider/Provider'
import "../index.css";

const App=()=>{
   
    
    return (
    <>
        <Nav />
        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/Login' Component={Login}/>
            <Route path='/Loginn' Component={Loginn}/>
            <Route path='/Signin' Component={SignIn}/>
            <Route path='/Signinn' Component={SignInn}/>
            <Route path='/Provider' Component={Provider}/>
            <Route path='/Service/:id' Component={Service}/>
        </Routes>
        <Footer id="footer" />
    </>
    )
}

export default App;