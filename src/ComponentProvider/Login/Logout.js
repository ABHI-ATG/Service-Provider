import { useContext, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { userContext } from '../../App';

const Login = () => {
    const navigate=useNavigate();
    const {state,dispatch}=useContext(userContext);  

    const callLogOut=async()=>{
        try{
            const res=await fetch('/out',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            if(res.status===200){
                dispatch({type:"USER",payload:0});
                navigate('/');
            }else{  
                console.log("Error");
                throw new Error("Logout Failed")
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        callLogOut();
    },[])


  return (
    <>
    <h1>This is logout page</h1>
    </>
  )
}
export default Login;