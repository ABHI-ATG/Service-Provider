import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './User/App'
import {BrowserRouter} from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ThemeProvider>
  <App />
  </ThemeProvider>
    
  </BrowserRouter>
);