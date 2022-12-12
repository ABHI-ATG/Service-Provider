import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage';
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from './components/pages/SignUpPage';
import ForgetPasswordPage from './components/pages/ForgetPasswordPage';
import HomePage from './components/pages/HomePage';

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


