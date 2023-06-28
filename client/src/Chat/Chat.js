import React, { useEffect } from 'react'
import axios from 'axios';

const Chat = () => {

  const create=async()=>{
    try {
      const proId=window.location.href.split('?id=')[1];
      const create=await axios.post('/api/client/create',{
        user:localStorage.getItem('id'),
        provider:proId
      },{
        method:"POST",
        headers:{
        Authorization:localStorage.getItem('token'),
      }})
      console.log(create)
    } catch (error) {
      console.log("Error in creating")   
    }
  }

  useEffect(()=>{
    create();
  },[])

  return (
    <div>
        hello
    </div>
  )
}

export default Chat
