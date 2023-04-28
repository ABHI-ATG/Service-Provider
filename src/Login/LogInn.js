import { Link } from 'react-router-dom';

const Loginn = () => {
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
                            <Link to='/Signinn'>
                                Register
                            </Link>
                        </span>
                    </div>

                    <div className="loginForm__form">
                        <form className=' flex flex-col justify-center' >
                            <div className="mb-3 w-80">
                                <label className="block">
                                    <span className="text-grey-700 text-lg">Email Address</span>
                                    <input type='email' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='jondoe@email.com' required />
                                </label>
                            </div>

                            <div className="mb-3 w-80">
                                <label className="block">
                                    <span className="text-grey-700 text-lg">Password</span>
                                    <input type='password' className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Password' required />
                                </label>
                            </div>

                            <div className="my-10">
                                {

                                    <button className=" bg-sky-400 text-white py-3 w-24 rounded-full" type="submit">
                                        Login
                                    </button>


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