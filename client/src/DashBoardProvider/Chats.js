import React, { useContext, useEffect, useState } from 'react'
import {userContext} from '../App'
import axios from 'axios';
import url from '../url';


const Chats = () => {

  const {state:{chat,message,socket},dispatch}=useContext(userContext);
  console.log(chat);
  const [content,setContent]=useState("");

  useEffect(()=>{
    socket.emit('connectRoom',chat._id);
  },[])


  const send=async()=>{
    if(content!==""){
      try {
        const data=await axios.post(`${url}/api/provider/send`,{
          chatId:chat._id,
          sender:2,
          content:content
        },{
          method:"POST",
          headers:{
            Authorization:localStorage.getItem("token"),
            "Content-Type":"application/json"
          }
        })
        dispatch({type:"message",payload:{
          id:chat._id,
          sender:2,
          content:content
        }})
        dispatch({type:"chatMessage",payload:{
          sender:2,
          content:content
        }})
        socket.emit('send',{
          chatId:chat._id,
          sender:2,
          content:content
        })
        setContent("");
      } catch (error) {
        console.log(error);
      }
    }
  }

   // Recieve
   useEffect(()=>{
    socket.on('recieved',(data)=>{
      if(chat._id===data.chatId){
        dispatch({type:"chatMessage",payload:{
          sender:data.sender,
          content:data.content
        }})
        dispatch({type:"message",payload:{
          id:data.chatId,
          sender:data.sender,
          content:data.content
        }})
      }else{
        dispatch({type:"message",payload:{
          id:data.chatId,
          sender:data.sender,
          content:data.content
        }})
      }
    })
    return ()=>{
      socket.disconnect();
    }
  },[])

  return (
    <div>
      {chat.message && chat.message.map((item)=>{
        return <>
          <div className={`message${item.sender}`}>
            {item.content}
          </div>
        </>
      })}
      <input value={content} type="text" placeholder='Type...' onChange={(e)=>setContent(e.target.value)}/>
      <button onClick={send}>&gt;</button>
    </div>
  )
}

export default Chats
