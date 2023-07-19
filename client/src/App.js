import React, { createContext, useReducer, useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import Service from './Services/Services'
import LoginUser from './LoginUser/Signin'
import LoginPro from './LoginProvider/Login'
import SignInUser from './LoginUser/Signup'
import SignInPro from './LoginProvider/Register'
import LogoutUser from './LoginUser/Logout';
import LogoutPro from './LoginProvider/Logout'
import Chat from './Chat/Chat'
import Chatting from './Chat/Chatting'
import Home from './Home/Home';
import Footer from './Footer/Footer'
import Nav from './Nav/Nav'
import './Css/index.css'
import './Css/card.css'
import './Css/search.css'
export const userContext=createContext();

const App=()=>{
    
    // onLine, user, provider, message
    const [initialState,setInitialState]=useState({
        onLine:1,
        user:{},
        provider:{},
        message:[]
    });
    const reducer=(state,action)=>{
        if(action.type==='online'){
            return {...state,onLine:action.payload};
        }else if(action.type==='offline'){
            return {...state,onLine:0};
        }else if(action.type==='user'){
            return {...state,user:action.payload};
        }else if(action.type==='provider'){
            return {...state,provider:action.payload};
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
                <Route path='/logout' Component={LogoutUser}/>
                <Route path='/login' Component={LoginPro}/>
                <Route path='/register' Component={SignInPro}/>
                <Route path='/out' Component={LogoutPro}/>
                <Route path='/dashboard' Component={SignInPro}/>
                <Route path='/Service' Component={Service}/>
                <Route path='/chat' Component={Chat}/>
                <Route path='/chatting' Component={Chatting}/>
            </Routes>
            <Footer id="footer" />
        </userContext.Provider>

    </>
    )
}

export default App;