import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {  
    const navigate=useNavigate();

    const [userData,setuserData]=useState({
        fname:"",lname:"",email:"",mobile:"",password:"",cpassword:""
    })

    const [showPassword, setShowPassword] = useState(false);

    const onChangeHandle = (e) => {
        const value=e.target.value;
        const name=e.target.name;
        setuserData({...userData,[name]:value})
        console.log(userData);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit=async (e)=>{
        e.preventDefault();

        const {fname,lname,email,mobile,password,cpassword}=userData;
        console.log(userData);
        const res=await fetch('/signup',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname:fname,lname:lname,email:email,mobile:mobile,password:password,cpassword:cpassword
            })
        })

        const data=await res.json();
        if(data.status===400 || !data){
            console.log("Fail to Sign Up");
        }else{
            console.log("Success");
            navigate('/signin');
        }
    }


    return (
        <>
            <div className="w-full h-4/5 grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
                <div className="signupForm rounded-2xl w-11/12 md:w-8/12 p-5">
                    <div className="signupForm__title text-5xl font-medium">
                        Sign Up<span className="text-sky-400">.</span>
                    </div>

                    <div className="loginForm__subtitle py-5 text-base">
                        Already have an account?
                        <span className="ml-2 text-sky-400 font-medium">
                            <Link to='/signin'>
                                Login
                            </Link>
                        </span>
                    </div>

                    <div className="loginForm__form">
                        <form method='POST'>
                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">First Name</span>
                                    <input type='text' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter First Name'  name="fname" value={userData.fname} onChange={onChangeHandle} required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Last Name</span>
                                    <input type='text' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter Last Name' name="lname" value={userData.lname} onChange={onChangeHandle} required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Email Address</span>
                                    <input type='email' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='jondoe@email.com' name="email" value={userData.email} onChange={onChangeHandle}required />
                                </label>
                            </div>


                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Phone Number</span>
                                    <input type='text' minLength='10' maxLength='10' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter Phone Number'name="mobile" value={userData.mobile} onChange={onChangeHandle} required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Password</span>
                                    <div className=' flex '>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                            placeholder="Password" name="password" value={userData.password} onChange={onChangeHandle}
                                            required
                                        />
                                        {userData.password && (
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEyeSlash : faEye}
                                                className="eye-icon -ml-6 mt-4"
                                                onClick={toggleShowPassword}
                                            />
                                        )}
                                    </div>
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Confirm Password</span>
                                    <div className=' flex '>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                            placeholder="Confirm Password"
                                            name='cpassword' value={userData.cpassword} onChange={onChangeHandle}
                                            required
                                        />
                                        {userData.password && (
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEyeSlash : faEye}
                                                className="eye-icon -ml-6 mt-4"
                                                onClick={toggleShowPassword}
                                            />
                                        )}
                                    </div>
                                </label>
                            </div>

                            <div className="mt-6">
                                <input className="py-3 w-24 bg-sky-400 text-white rounded-full" type="submit" onClick={onSubmit} value="Sign Up"/>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="hidden md:block bg-[url('https://img.freepik.com/free-vector/cleaner-with-cleaning-products-housekeeping-service_18591-52057.jpg?w=740&t=st=1682167423~exp=1682168023~hmac=f0aae2ea84ab46eea6a12d64dadd8e9a92ac895b93fdb4d55d2fab433abef97b')] bg-right bg-no-repeat w-full h-full">
                </div>
            </div>
        </>
    )
}
export default SignIn;