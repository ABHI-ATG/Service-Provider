import React from 'react';
import Card from '../Card/Card'
import Banner from '../Banner/Banner';


const Home=()=>{
    
    return (
    <div>
        <Banner/>
       
        <Card type="Home Repairs"/>
        <Card type="Cleaning"/>
        <Card type="Designing"/>
        <Card type="Beauty"/>
    
    </div>
    )
}

export default Home;