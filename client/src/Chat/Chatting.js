import React, { useContext, useState } from 'react'
import { userContext } from '../App';

const Chatting = () => {

  const {state:{chat},dispatch}=useContext(userContext);
  const [content,setContent]=useState("");

  return (
    <div>
        <div>
          {
            chat?chat.message.map((item)=>{
              return (
                <>
                  <div className={`message${item.sender}`}>
                    {item.content}
                  </div>
                </>
              )
            }):<></>
          }
          <input value={content} type="text" placeholder='Type...' onChange={(e)=>setContent(e.target.value)}/>
          <button onClick={()=>{
            dispatch({type:"send",payload:{
              id:chat.provider._id,
              chatId:chat._id,
              sender:1,
              content:content,
            }})
            setContent("")
          }}>&gt;</button>
        </div>
    </div>
  )
}

export default Chatting

