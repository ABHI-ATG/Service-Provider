import React, { useContext } from 'react'
import { userContext } from '../App';

const Dashboard = () => {
  const {state:{provider,message}}=useContext(userContext);
  console.log(message);
  console.log(provider);
  return (
    <div>
    <div>
      {provider.fname}
      <br/>
      {provider.lname}
      <br/>
      {provider.mobile}
      <br/>
      {provider.email}
      <br/>
      {provider.pincode}
      <br/>
      {provider.state}
      <br/>
      {provider.city}
    </div>
    <div>
      {message.map((item)=>{
        return (
        <div>
          <h1>{item.user.fname+" "+item.user.lname}</h1>
          <p>{item.latest}</p>
        </div>
        )
      })}
    </div>
    </div>
  )
}

export default Dashboard;
