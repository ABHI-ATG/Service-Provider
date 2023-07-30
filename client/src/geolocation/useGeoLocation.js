import React,{useEffect, useState} from 'react' 
const useGeolocation = () => {
  const [location,setLocation] =useState({
    loaded: false,
    coordinates:{
        lat:"",
        lng:""
    }
  });

  const onSuccess=location=>{
    setLocation({
        loaded:true,
        coordinates:{
            lat: location.coords.latitude,
            lng: location.coords.longitude
        },
    });
  };

  const onFailure=error=>{
    setLocation({
        loaded:false,
       error,
    });
  }

  useEffect(()=>{
    if(!("geolocation"in navigator)){
        onFailure({
            code:0,
            message:"GeoLocation not supported"
        })
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
  },[])
    return location;
}

export default useGeolocation