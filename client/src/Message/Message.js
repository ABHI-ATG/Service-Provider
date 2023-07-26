import React, { useContext } from 'react'
import {userContext} from '../App'
import { useNavigate } from 'react-router-dom';
import url from '../url';
import axios from 'axios';

const Message = () => {

    const {state:{onLine,message,user,provider,socket},dispatch}=useContext(userContext);
    const navigate=useNavigate();

    const create=async()=>{
        try {
          const {data}=await axios.post(`${url}/api/client/create`,{
            user:user.id,
            provider:provider._id
          },{
            method:"POST",
            headers:{
              Authorization:user.token,
              "Content-Type":"application/json"
            }
        });
        dispatch({type:"create",payload:data._id});
        dispatch({type:'chat',payload:{
          chatId:data._id,
          message:[],
          puser:0,
          latest:"Say Hi!"
        }});
        
        } catch (error) {
          console.log(error);
        }
      }
    
      const goChatting=(item)=>{
        dispatch({type:"provider",payload:item.provider})
        let present;
        if(message.length){
          present=message.some((obj)=>{
            if(!obj.provider){
              return false;
            }
            if(obj.provider._id===item.provider._id){
              dispatch({type:'chat',payload:obj})
              return true;
            }
            return false;
          });
        }
        if(!present){
          create();
        }
        if(onLine==1)
        navigate('/chatting')
        else
        navigate('/dashboard/chatting')

      }
      

  return (
    <div>
        {message.length && message.map((item)=>{
            return (
                <div onClick={()=>{
                    goChatting(item);
                }}>
                    {item.provider ? item.provider.fname :<></>}
                    {item.provider ? item.provider.lname :<></>}
                    <h1>{item.latest}</h1>
                </div>
            )
        })}
    </div>
  )
}

export default Message
