import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const citiesByState = [
    {
        state: "Uttar Pradesh",
        cities: ["Ghaziabad", "Meerut", "Muradnagar"]
    },
    {
        state: "Delhi",
        cities: ["Siri", "Shergarh", "New Delhi", "Old Delhi"]
    },


];


const SignInn = () => {

    const [state, setstate] = useState("");
    const [city, setcity] = useState([]);


    const handleStateChange = (event) => {
        const value=event.target.value;
        const name=event.target.name;
        setuserData({...userData,[name]:value})

        const stateName = event.target.value;
        setstate(stateName);

        const stateObj = citiesByState.find((item) => item.state === stateName);
        if (stateObj) {
            setcity(stateObj.cities);
        } else {
            setcity([]);
        }
    };


    const navigate=useNavigate();

    const [userData,setuserData]=useState({
        fname:"",lname:"",email:"",mobile:"",state:"",district:"",pincode:"",city:"",profession:"",password:"",cpassword:""
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

        const {fname,lname,email,mobile,state,district,pincode,city,profession,password,cpassword}=userData;
        console.log(userData);
        const res=await fetch('/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname,lname,email,mobile,state,city,pincode,profession,password,cpassword
            })
        })

        const data=await res.json();
        if(data.status===400 || !data){
            console.log("Fail to Sign Up");
        }else{
            console.log("Success");
            navigate('/login');
        }
    }

    return (
        <>
        <div className="flex justify-center items-center  ">
            <div className="my-4 flex justify-center ">
           
                <div className="text-black flex flex-col justify-center">
                    <h3 className="mb-5 ml-5 text-4xl font-serif font-bold">Profesional Registration form</h3>
                   
                    <div className='profile py-3 flex flex-col justify-center w-[120px] border-4 rounded-full border-gray-100  align-middle shadow-lg cursor-pointer hover:border-gray-400'>
                        <label htmlFor="profile">
                        <img src="./icons/altPro.jpg" alt="./icons/altPro.jpg" 
                          className=' '/>
                        </label>
                        <input type="file" id='profile' name='profile' />
                    </div>
                    
                    <form className=' ml-5 flex flex-col  justify-center py-6'>
                        <div className="flex flex-wrap  ">
                            <div className="w-72 mr-5 mb-4 border-black items-end gap-6">
                                <input class="appearance-none block w-full  text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="First Name" name="fname" value={userData.fname} onChange={onChangeHandle} required />
                            </div>
                            <div className=" flex w-72 mb-4 items-end gap-6">
                                <input class="appearance-none block w-full  text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Last Name" name="lname" value={userData.lname} onChange={onChangeHandle} required />
                            </div>
                        </div>

                        <div className="flex flex-wrap  ">
                            <div className="w-72 mr-5 mb-4 border-black items-end gap-6">
                                <input class="appearance-none block w-full  text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Email Address" name="email" value={userData.email} onChange={onChangeHandle} required />
                            </div>
                            <div className=" flex w-72 mb-4 items-end gap-6">
                                <input class="appearance-none block w-full  text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" placeholder="Phone Number" name="mobile" value={userData.mobile} onChange={onChangeHandle} required />
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap">
                            <div className="w-72 mr-5 mb-4 text-blue-gray-600">
                                <select className='w-72 text-sm rounded-lg border-blue-gray-600' value={userData.state} name="state" onChange={handleStateChange} required>
                                    <option className=' text-blue-gray-600 ' value="">Select a state</option>
                                    {citiesByState.map((item) => (
                                        <option className='text-blue-gray-600 ' key={item.state} value={item.state}>
                                            {item.state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-72 mb-4 text-blue-gray-600">
                                <select className=' w-72 text-sm rounded-lg border-blue-gray-600 ' disabled={!userData.state} required value={userData.city} name="city" onChange={onChangeHandle}>
                                    <option className=' text-blue-gray-600 ' value="">Select a city</option>
                                    {city.map((city) => (
                                        <option className='text-blue-gray-600 ' key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    <div className="flex flex-wrap">
                        <div className="w-72 mb-4 items-end gap-6">
                            <input class="appearance-none block w-full  text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" name="pincode" value={userData.pincode} onChange={onChangeHandle} pattern="[0-9]{6}" maxlength="6" placeholder="Pincode" required />
                        </div>


                    <div className="w-72">
                            <select label="Select Proffessional" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder='Select proffesional' required name="profession" onChange={onChangeHandle} value={userData.profession}>
                                <option className=' text-blue-gray-600 ' value="">Select Profesional</option>
                                <option>Air Conditioner</option>
                                <option>Appliances</option>
                                <option>Electrician</option>
                                <option>Plumber</option>
                                <option>Paintor</option>
                                <option>Kitchen</option>
                                <option>Salon For Men</option>
                                <option>Salon For Women</option>
                                <option>Tailor</option>
                                <option>Bathroom</option>
                                <option>HomeWorker</option>
                            </select>
                        </div>
                    </div>

                        <div className="flex flex-wrap  ">
                            <div className=" flex w-72 mb-4 items-end gap-6">
                                <input type={showPassword ? 'text' : 'password'} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent     focus:border-gray-500 focus:bg-white focus:ring-0" value={userData.password} name="password" onChange={onChangeHandle}   placeholder="Password" required />
                                {userData.password && (
                                  <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="eye-icon -ml-6 mt-4"
                                    onClick={toggleShowPassword}
                                  />
                                )}
                            </div>
                            <div className=" flex w-72 mb-4 items-end gap-6">
                                <input type={showPassword ? 'text' : 'password'} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent         focus:border-gray-500 focus:bg-white focus:ring-0" value={userData.cpassword} name="cpassword" onChange={onChangeHandle}      placeholder="Password" required />
                                    {userData.password && (
                                      <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        className="eye-icon -ml-6 mt-4"
                                        onClick={toggleShowPassword}
                                      />
                                    )}
                            </div>
                        </div>

                        

                        <div className="flex justify-center pt-3 mr-24">
                            <input class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border  border-blue-500 hover:border-transparent rounded-full" type="submit" onClick={onSubmit}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>


    )
}
export default SignInn;