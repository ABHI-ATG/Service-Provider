import React, { createContext, useEffect, useReducer, useState } from 'react';
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
import Dashboard from './DashBoardProvider/Dashboard';
import Chats from './DashBoardProvider/Chats'
import Message from './Message/Message'
import Nav from './Nav/Nav'
import './Css/index.css'
import './Css/card.css'
import './Css/search.css'
import axios from 'axios';
import url from './url'
export const userContext=createContext();

const App=()=>{
    
    // onLine, user, provider, message
    const [initialState,setInitialState]=useState({
        onLine:0,
        user:{},
        provider:{},
        message:[],
        chat:{}
    });

    

    const setProData=async()=>{
        try {
            const data=await axios.post(`${url}/api/provider/details`,{
                id:localStorage.getItem("id")
              },{
                method:"POST",
                headers:{
                    Authorization:localStorage.getItem("token"),
                    "Content-Type":"application/json"
                }
            })
          dispatch({type:"messageUpdate",payload:data.data.message});
          dispatch({type:"provider",payload:data.data.user});

        } catch (error) {
            console.log(error);
        }
    }

    const setUserData=async()=>{
        console.log("user");
        try {
            const data=await axios.post(`${url}/api/client/details`,{
                id:localStorage.getItem("id")
              },{
                method:"POST",
                headers:{
                    Authorization:localStorage.getItem("token"),
                    "Content-Type":"application/json"
                }
            })
            console.log(data);
          dispatch({type:"messageUpdate",payload:data.data.message});
          dispatch({type:"user",payload:data.data.user});
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        const tmp=localStorage.getItem("onLine");
        if(tmp && !initialState.onLine){
            dispatch({type:"online",payload:tmp});
            if(tmp==1){
                setUserData();
            }else{
                setProData();
            }
        }
    },[])

    const reducer=(state,action)=>{
        if(action.type==='online'){
            return {...state,onLine:action.payload};
        }else if(action.type==='offline'){
            return {...state,onLine:0};
        }else if(action.type==='user'){
            return {...state,user:action.payload};
        }else if(action.type==='provider'){
            return {...state,provider:action.payload};
        }else if(action.type==='create'){
            return {...state,message:[...state.message,{
                chatId:action.payload,
                message:[],
                puser:0,
                latest:"Say Hi!"
            }]};
        }else if(action.type==='messageUpdate'){
            return {...state,message:action.payload};
        }else if(action.type==='message'){
            return {...state,message:state.message.map((item)=>{
                if(item._id===action.payload.id){
                    item.message=[...item.message,{sender:action.payload.sender,content:action.payload.content}]
                }
                return item;
            })}
        }else if(action.type==='chat'){
            return {...state,chat:action.payload};
        }else if(action.type==='chatMessage'){
            return {...state,chat:{...state.chat,message:[...state.chat.message,action.payload]}};
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
                <Route path='/Service' Component={Service}/>
                <Route path='/chat' Component={Chat}/>
                <Route path='/chatting' Component={Chatting}/>
                <Route path='/dashboard' Component={Dashboard}/>
                <Route path='/dashboard/chatting' Component={Chats}/>
                <Route path='/message' Component={Message}/>
            </Routes>
            <Footer id="footer" />
        </userContext.Provider>

    </>
    )
}

export default App;