import { useState } from 'react';




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

    const [selectedState, setSelectedState] = useState("");
    const [selectedCities, setSelectedCities] = useState([]);


    const handleStateChange = (event) => {
        const stateName = event.target.value;
        setSelectedState(stateName);

        const selectedStateObj = citiesByState.find((item) => item.state === stateName);
        if (selectedStateObj) {
            setSelectedCities(selectedStateObj.cities);
        } else {
            setSelectedCities([]);
        }
    };


    return (

        <div className="flex justify-center items-center  ">
            <div className="my-4 flex justify-center ">

                <div className="text-black flex flex-col justify-center">
                    <h3 className="mb-5 ml-5 text-4xl font-serif font-bold">Profesional Registration form</h3>

                    <form className=' ml-5 flex flex-col  justify-center'>
                        <div className="flex flex-wrap  ">
                            <div className="w-72 mr-5 mb-4 border-black items-end gap-6">
                                <input class="appearance-none block w-full  text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="First Name" required />
                            </div>
                            <div className=" flex w-72 mb-4 items-end gap-6">
                                <input class="appearance-none block w-full  text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Last Name" required />
                            </div>
                        </div>

                        <div className="flex flex-wrap  ">
                            <div className="w-72 mr-5 mb-4 border-black items-end gap-6">
                                <input class="appearance-none block w-full  text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Email Address" required />
                            </div>
                            <div className=" flex w-72 mb-4 items-end gap-6">
                                <input class="appearance-none block w-full  text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Set Password" required />
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="w-72 mr-5 mb-4 text-blue-gray-600">
                                <select className='w-72 text-sm rounded-lg border-blue-gray-600' value={selectedState} onChange={handleStateChange} required>
                                    <option className=' text-blue-gray-600 ' value="">Select a state</option>
                                    {citiesByState.map((item) => (
                                        <option className='text-blue-gray-600 ' key={item.state} value={item.state}>
                                            {item.state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-72 mb-4 text-blue-gray-600">
                                <select className=' w-72 text-sm rounded-lg border-blue-gray-600 ' disabled={!selectedState} required>
                                    <option className=' text-blue-gray-600 ' value="">Select a city</option>
                                    {selectedCities.map((city) => (
                                        <option className='text-blue-gray-600 ' key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="w-72 mb-4 items-end gap-6">
                            <input class="appearance-none block w-full  text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" name="pin" pattern="[0-9]{6}" maxlength="6" placeholder="Pincode" required />
                        </div>


                        <div className="w-72">
                            <select label="Select Proffessional" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder='Select proffesional' required>
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

                        <div className="flex justify-center pt-3 mr-24">
                            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border  border-blue-500 hover:border-transparent rounded-full">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}
export default SignInn;