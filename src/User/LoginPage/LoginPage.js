import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function LoginPage() {
    return (
        <div className="text-center m-5-auto">
            <h2>Login to us</h2>
            <form >
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" name="first_name" required />
                </p>
                <p>
                    <label>Password</label>
                    
                    <br/>
                    <input type="password" name="password" required />
                </p>
                <label className="right-label"><Link to = '/forget-password'>Forget password?</Link></label>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time?<Link to = '/signup'>Create an account.</Link> </p>
                <p><Link to = '/home'>Back to Homepage.</Link></p>
            </footer>
        </div>
    )
}
