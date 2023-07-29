import React, { useState } from "react";
import axios from "axios";
import useGeolocation from "../geolocation/useGeoLocation";
const ReverseGeocode = () => {
  const location = useGeolocation();
 const latitude= location.coordinates.lat;
 const longitude=location.coordinates.lng;
 console.log(latitude);
 console.log(longitude);
  const [city, setCity] = useState("");
  const handleButtonClick = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=2db1aa83396f46a48bc7138745561d10`
      );
      console.log(response);
      if (response.data.features && response.data.features.length > 0) {
        const address = response.data.features[0].properties.formatted;
        setCity(address);
      } else {
        setCity("Address not found.");
      }
    } catch (error) {
      setCity("Error fetching data. API not hitting");
    
    }
  };

  return (
    <div>
        <div>
      
        </div>
      <button onClick={handleButtonClick}>Click here to Confirm location</button>
      <p>{city}</p>
    </div>
  );
};

export default ReverseGeocode;
