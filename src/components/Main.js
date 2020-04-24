import React from 'react';
import  { CityProvider} from "../context";
import Home from "./Home"

const Main = () => {
    return (
    <CityProvider>
        <Home/>
    </CityProvider>
    );
} 

export default Main