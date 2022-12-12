import './App.css';
import React from 'react';
import Cards from './Cards/Cards';
import Monthly from './Cards/Monthly'
import Daily from './Cards/Daily'

function App() {

  console.log(Monthly);
  console.log("abhi_");

  return (
    <>
    <Cards props={Monthly}/>
    <Cards props={Daily}/>
    </>

  );
}

export default App;
