import React, { createContext, useReducer } from 'react';
import {Routes,Route} from 'react-router-dom';
import Service from './Services/Services'
import LoginUser from './LoginUser/Signin'
import LoginPro from './LoginProvider/Login'
import SignInUser from './LoginUser/Signup'
import SignInPro from './LoginProvider/Register'
import LogoutUser from './LoginUser/Logout';
import LogoutPro from './LoginProvider/Logout'
import Home from './Home/Home';
import Footer from './Footer/Footer'
import Nav from './Nav/Nav'
import './Css/index.css'
import './Css/card.css'
import './Css/search.css'
export const userContext=createContext();

const App=()=>{
    
    const initialState=0;
    const reducer=(state,action)=>{
        if(action.type==='USER'){
            return action.payload;
        }
        return state;
    }
    
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
    <>
        <userContext.Provider value={{state,dispatch}}>
            <Nav/>
            <Routes>
                <Route path='/' Component={Home}/>
                <Route path='/signin' Component={LoginUser}/>
                <Route path='/signup' Component={SignInUser}/>
                <Route path='/login' Component={LoginPro}/>
                <Route path='/register' Component={SignInPro}/>
                <Route path='/logout' Component={LogoutUser}/>
                <Route path='/out' Component={LogoutPro}/>
                <Route path='/dashboard' Component={SignInPro}/>
                <Route path='/Service' Component={Service}/>
            </Routes>
            <Footer id="footer" />
        </userContext.Provider>

    </>
    )
}

export default App;