import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

    }


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
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
                            <Link to='/login'>
                                Login
                            </Link>
                        </span>
                    </div>

                    <div className="loginForm__form">
                        <form >
                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">First Name</span>
                                    <input type='text' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter First Name' required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Last Name</span>
                                    <input type='text' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter Last Name' required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Email Address</span>
                                    <input type='email' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='jondoe@email.com' required />
                                </label>
                            </div>


                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Phone Number</span>
                                    <input type='text' minLength='10' maxLength='10' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter Phone Number' required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Password</span>
                                    <div className=' flex '>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                            value={password}
                                            onChange={handlePasswordChange}
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

                            <div className="mt-6">
                                {

                                    <button className="py-3 w-24 bg-sky-400 text-white rounded-full" type="submit">
                                        Sign Up
                                    </button>
                                }
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