import React from 'react'
import { Link } from 'react-router-dom'
import Cards from './Cards/Cards';
import Monthly from './Cards/Monthly'
import Daily from './Cards/Daily'
import NavBar from '../NavBar/NavBar'

export default function HomePage() {
    return (
        <>
        <div className="text-center">
            <NavBar/>
            <h1 className="main-title home-page-title">welcome to our app</h1>
            <Cards props={Monthly}/>
            <Cards props={Daily}/>
        </div>
        </>

    )
}
