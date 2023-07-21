import React, { useContext } from 'react'
import {userContext} from '../App'
import { useNavigate } from 'react-router-dom';

const Message = () => {

    const {state:{message},dispatch}=useContext(userContext);
    console.log(message);
    const navigate=useNavigate();

  return (
    <div>
        {message.length && message.map((item)=>{
            return (
                <div onClick={()=>{
                    dispatch({type:"provider",payload:item.provider})
                    navigate('/chatting');
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
