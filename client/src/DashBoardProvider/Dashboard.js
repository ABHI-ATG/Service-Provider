import React, { useContext } from "react";
import { userContext } from "../App";
import style from '../Css/dashboard.css'
const Dashboard = () => {
  const {
    state: { provider, message },
  } = useContext(userContext);
  console.log(message);
  console.log(provider);
  return (
    <div className="Complete">
      <div className="MainWrapper">
        <div>{provider.fname}  fnam lname {provider.lname}</div>
        <div>{provider.mobile} mobile</div>
        <div>{provider.email} email</div>
        <div>{provider.pincode} pincode</div>
        <div>{provider.state} state</div>
        <div>{provider.city} city</div>
      </div>
      <div>
        <h1>fname lname</h1>
        <p>Hi! message h  ere</p>
        {message.map((item) => {
          return (
            <div>
              <h1> fname lname {item.user.fname + " " + item.user.lname}</h1>
              <p> Hi! message here +{item.latest}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
