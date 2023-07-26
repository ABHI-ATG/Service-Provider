import React, { useContext, useState } from 'react'
import {userContext} from '../App'


const Chats = () => {

  const {state:{chat},dispatch}=useContext(userContext);
  const [content,setContent]=useState("");

  return (
    <div>
      {chat && chat.message.map((item)=>{
        return <>
          <div className={`message${item.sender}`}>
            {item.content}
          </div>
        </>
      })}
      <input value={content} type="text" placeholder='Type...' onChange={(e)=>setContent(e.target.value)}/>
      <button onClick={()=>{
        dispatch({type:"send",payload:{
          id:chat.user._id,
          chatId:chat._id,
          sender:2,
          content:content,
        }})
        setContent("");
      }}>&gt;</button>
    </div>
  )
}

export default Chats
