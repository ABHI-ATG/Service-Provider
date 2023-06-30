import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Chat = () => {

  const [room,setRoom]=useState("");
  const [proData,setProData]=useState([]);

  const create=async()=>{
    try {
      const proId=window.location.href.split('?id=')[1];
      const create=await axios.post('/api/client/create',{
        user:localStorage.getItem('id'),
        provider:proId
      },{
        headers:{
          Authorization:localStorage.getItem('token')
        }
      })
      setProData(create.data.provider);
      console.log(create.data)
    } catch (error) {
      console.log("Error in creating")  
      console.log(error); 
    }
  }

  useEffect(()=>{
    create();
  },[])

  return (
    <div>
        {/* Provider Details */}
        <div>
          {proData.city}
          <br/>
          {proData.email}
          <br/>
          {proData.fname}
          <br/>
          {proData.lname}
          <br/>
          {proData.mobile}
          <br/>
          {proData.pincode}
          <br/>
          {proData.profession}
          <br/>
          {proData.state}
          <br/>
        </div>
        {/* Chat code */}
        <div>
          
        </div>
    </div>
  )
}

export default Chat
