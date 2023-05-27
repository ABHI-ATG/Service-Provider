import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Providers from './Providers';

const Services = () => {
    const location = useLocation();
    const encodedName = location.pathname.slice(9);
    const decodedName = decodeURIComponent(encodedName);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        filterData(searchTerm);

    }, [searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterData = (searchTerm) => {
        const filteredProviders = Providers.filter(item => {
            return (
                (item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.pincode.includes(searchTerm)) &&
                item.proname === decodedName
            );
        });
        setFilteredData(filteredProviders);
    };

    return (
        <div>
            <div className=" flex justify-center">

                <form className=" w-11/12 m-8">
                    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="text" value={searchTerm} onChange={handleSearch}  id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by States, City , Pincode" required/>
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

            </div>
            <div>
                <h1 className="text-center text-6xl text-stone-800" style={{ fontFamily: "fantasy" }}>{decodedName} Services</h1>
            </div>
            <div>
                {filteredData.length > 0 ? (
                    <div className="flex flex-wrap my-5 justify-center">
                        {filteredData.map((item, index) => (
                            <div key={index} className="flex justify-center my-5 mx-5">
                                <div className="relative flex-col items-center shadow-2xl rounded-[20px] px-2">
                                    <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                                        <img src='https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U' className="absolute flex h-32 w-full justify-center rounded-xl bg-cover" />
                                        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white ">
                                            <img className="h-full w-full rounded-full" src='https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U' alt="" />
                                        </div>
                                    </div>
                                    <div className="mt-16 flex flex-col items-center">
                                        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                            {item.name}
                                        </h4>
                                        <p className="text-base font-normal text-gray-600">State: {item.state}</p>
                                        <p className="text-base font-normal text-gray-600">City: {item.city}</p>
                                        <p className="text-base font-normal text-gray-600">Pincode: {item.pincode}</p>
                                    </div>
                                    <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-2xl font-bold text-navy-700 dark:text-white">{item.experience}</p>
                                            <p className="text-sm font-normal text-gray-600">Years Of Experienced</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                                4.5/10
                                            </p>
                                            <p className="text-sm font-normal text-gray-600">Rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No data available for {decodedName}</p>
                )}
            </div>
        </div>
    );
};

export default Services;
