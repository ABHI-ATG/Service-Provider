import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { userContext } from '../../App';

const Loginn = () => {
    const {state,dispatch}=useContext(userContext);  
    const navigate=useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const onSubmit=async (e)=>{
      e.preventDefault();
  
      const res=await fetch('/login',{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              email,password
          })
      })
  
      const data=await res.json();
      if(data.status===400 || !data){
          console.log("Fail to Sign Up");
      }else{
        dispatch({type:"USER",payload:2});
          console.log("Success");
          navigate('/');
      }
  }


    return (
        <>
            <div className="w-full ">
                <div className="loginForm rounded-2xl flex flex-col  justify-items-center items-center w-full p-5">
                    <div className="loginForm__title text-5xl font-medium">
                        Professionals Login<span className=" text-sky-400">.</span>
                    </div>

                    <div className="loginForm__subtitle py-5 text-base">
                        Don't have an account?
                        <span className="ml-2 text-sky-400 font-medium">
                            <Link to='/register'>
                                Register
                            </Link>
                        </span>
                    </div>

                    <div className="loginForm__form">
                        <form method="POST" className=' flex flex-col justify-center' >
                            <div className="mb-3 w-80">
                                <label className="block">
                                    <span className="text-grey-700 text-lg">Email Address</span>
                                    <input type='email' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='jondoe@email.com' required name="email" value={email}
                                    onChange={(e)=>setEmail(e.target.value)}/>
                                </label>
                            </div>

                            <div className="mb-3 w-80">
                                <label className="block">
                                    <span className="text-grey-700 text-lg">Password</span>
                                    <div className=' flex '>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                            placeholder="Password"
                                            name="password" value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                            required
                                        />
                                        {password &&
                                        (
                                            <FontAwesomeIcon 
                                            icon={showPassword ? faEyeSlash : faEye}
                                            className="eye-icon -ml-6 mt-4"
                                            onClick={toggleShowPassword}
                                        />
                                        ) }
                                        
                                    </div>
                                </label>

                            </div>

                            <div className="my-4">
                                {
                                    <input className=" bg-sky-400 text-white py-3 w-24 rounded-full" onClick={onSubmit} type="submit"/>
                                }
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Loginn;