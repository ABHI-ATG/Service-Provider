import React, { useContext, useState } from 'react'
import {userContext} from '../App'
import axios from 'axios';
import url from '../url';


const Chats = () => {

  const {state:{chat,message},dispatch}=useContext(userContext);
  console.log(chat);
  const [content,setContent]=useState("");


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
        console.log(data);
        console.log(message);
        console.log(chat);
        setContent("");
      } catch (error) {
        console.log(error);
      }
    }
  }

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
