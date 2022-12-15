import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

import LandingPage from './User/LandingPage/LandingPage';
import LoginPage from "./User/LoginPage/LoginPage";
import SignUpPage from './User/SignUpPage/SignUpPage';
import ForgetPasswordPage from './User/ForgetPasswordPage/ForgetPasswordPage';
import HomePage from './User/Home Page/HomePage';

import './App.css'


export default function App() {
    return (
        <BrowserRouter>
            
                <Routes>
                
                    <Route path="/" element={<LandingPage/> } />
                    <Route path="/login" element={ <LoginPage/>} />
                    <Route path="/signup" element={ <SignUpPage/> } />
                    <Route path="/forget-password" element={ <ForgetPasswordPage/> } />
                    <Route path="/home" element={ <HomePage/> } />

                </Routes>
            
        </BrowserRouter>
        
    )
}


