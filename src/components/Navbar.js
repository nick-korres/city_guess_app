import React, { useState,useContext, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "../css/Navbar.css"
import ProgressBar from './ProgressBar'
import { CityContext }  from "../context";

const Navbar = () => {
    const cityContext = useContext(CityContext);
    const {progPerc,started,toggleStart} = cityContext;
    const [overVis, setOverVis] = useState(!started);
    let show = overVis ? 'show' : 'hide';
    const toggleOver = () => {
        setOverVis(!overVis)
        if(progPerc===0) {toggleStart()};
    }
    useEffect( ()=> {
        if (progPerc===1 && !started) { toggleOver()  }
    },[started])
    return (
        <>
            <nav className="navbar">
                {(progPerc===1)
                 ?<div className={`overlay ${show}`}>
                     <div className={`overlay-text ${show}`}>
                         <p>kati</p>
                    </div>
                  </div>
                 :  <div className={`overlay ${show}`}>
                        <div className={`overlay-text ${show}`}>
                            <p>Guess the name of the city that appears in the picture</p>
                            <p>You gain points for every second of time remaining</p>
                        </div>
                    <button type="button" className={`over-button ${show}`} onClick={toggleOver} >  Start  </button>
                 </div>
                }    
                <ProgressBar percentage={progPerc}/>
                {/* <div className="nav-header"> */}
                <Link to="/">
                    <FaHome className="nav-button"/>
                </Link>                
                <button type="button" className="button" onClick={toggleOver} >Papia</button>
                {/* </div> */}
            </nav>
        </>
     );
}
 
export default Navbar;