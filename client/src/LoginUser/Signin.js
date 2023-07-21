import { useState,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { userContext } from '../App';
import axios from 'axios'
import url from '../url'

const Login = () => {

  const {state:{user,provider,message,chat},dispatch}=useContext(userContext);  

  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const messageUpdate=async(token,id)=>{
    try {
      const data=await axios.post(`${url}/api/client/details`,{
        id:id
      },{
        method:"POST",
        headers:{
            Authorization:localStorage.getItem("token"),
            "Content-Type":"application/json"
        }
      })
      console.log(data.data);
      dispatch({type:"user",payload:data.data.user});
      dispatch({type:"messageUpdate",payload:data.data.message});
      navigate('/');
    } catch (error) {
      console.log(error);      
    }
  }

  const onSubmit=async (e)=>{
    e.preventDefault();

    const data=await axios.post(`${url}/api/client/signin`,{
      email,password
      },{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(data.status===400 || !data){
        console.log("Fail to Sign Up");
    }else{
        localStorage.setItem("id",data.data.id);
        localStorage.setItem("token",data.data.token);
        localStorage.setItem("name",data.data.name);
        localStorage.setItem("onLine",1);
        dispatch({type:"online",payload:1});
        messageUpdate(data.data.token,data.data.id);
    }
}



  return (
    <>
      <div className="w-full h-4/5 grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
        <div className="loginForm rounded-2xl w-11/12 md:w-8/12 h-4/5 md:h-5/6 p-5">
          <div className="loginForm__title text-5xl font-medium">
            SignIn<span className=" text-sky-400">.</span>
          </div>

          <div className="loginForm__subtitle py-5 text-base">
            Don't have an account?
            <span className="ml-2 text-sky-400 font-medium">
              <Link to='/signup'>
                Sign Up
              </Link>
            </span>
          </div>

          <div className="loginForm__form">
            <form method='POST'>
              <div className="mb-3">
                <label className="block">
                  <span className="text-grey-700">Email Address</span>
                  <input type='email' className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='jondoe@email.com' value={email} name="email" onChange={(e)=>{
                    setEmail(e.target.value)
                  }} required />
                </label>
              </div>

              <div className="mb-3">
                <label className="block">
                  <span className="text-grey-700">Password</span>
                  <div className=' flex '>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                      value={password} name="password" onChange={(e)=>{
                        setPassword(e.target.value)
                      }}
                      placeholder="Password"
                      required
                    />
                    {password && (
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="eye-icon -ml-6 mt-4"
                        onClick={toggleShowPassword}
                      />
                    )}
                  </div>
                </label>
              </div>

              <div className="my-10">
                {

                  <input className=" bg-sky-400 text-white py-3 w-24 rounded-full" type="submit" onClick={onSubmit} value="SignIn"/>
                }
              </div>
            </form>
          </div>
        </div>

        <div className="hidden md:block bg-[url('https://img.freepik.com/free-vector/cleaners-with-cleaning-products-housekeeping-service_18591-52068.jpg?w=740&t=st=1682166693~exp=1682167293~hmac=64f5e0eb7e8469795f4782203b4f34d321d34786324396addf4fd0b94cee2f24')]  bg-right bg-no-repeat w-full h-[500px]">

        </div>
      </div>
    </>
  )
}
export default Login;