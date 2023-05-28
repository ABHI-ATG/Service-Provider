import { useEffect,useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import { userContext } from '../../App';


const Logout = () => {
    const {state,dispatch}=useContext(userContext);  
    const navigate=useNavigate();

    const callLogOut=async()=>{
        try{
            const res=await fetch('/logout',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            if(res.status===400){
                console.log("Error");
                throw new Error("Logout Failed")
            }else{  
                dispatch({type:"USER",payload:0});
                navigate('/');
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
export default Logout;