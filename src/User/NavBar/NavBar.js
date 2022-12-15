import { Link } from 'react-router-dom'
import React from 'react'

export default function NavBar() {
    return (
        <div >
            <Link to="/home">Home
            </Link>
            <Link to="/monthly">Monthly
            </Link>
            <Link to="/daily">Daily
            </Link>
            <Link to="/blog">Blog
            </Link>
            <Link to="/about">About
            </Link>
            <Link to="/">Log Out
            </Link>
        </div>
    )
}