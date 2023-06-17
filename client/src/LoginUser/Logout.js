import { useEffect,useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import axios from 'axios';

const Logout = () => {
    const {state,dispatch}=useContext(userContext);  
    const navigate=useNavigate();

    const callLogOut=async()=>{
        try{
            const res=await axios.get('/api/client/signout',{
                headers:{
                    Authorization:localStorage.getItem('token'),
                    Accept:"application/json",
                },
            })
            console.log(res);
            if(res.status===400){
                console.log("Error");
                throw new Error("Logout Failed")
            }else{  
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                localStorage.removeItem("name");
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