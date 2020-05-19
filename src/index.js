import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import  { CityProvider } from "./context";
import App from './App';


ReactDOM.render(
    <CityProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CityProvider>
    ,document.getElementById('root')
);
