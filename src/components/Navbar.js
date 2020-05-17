import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "../css/Navbar.css"
import { useState } from 'react';

const Navbar = () => {
    const [overVis, setOverVis] = useState(false);
    let show = overVis ? 'show' : 'hide';
    const toggleOver = () => {setOverVis(!overVis)}
    return (
        <>
            <nav className="navbar">
                <div className={`overlay ${show}`}>
                    <div className={`overlay-text ${show}`}>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
                    <button type="button" className={`over-button ${show}`} onClick={toggleOver} >  papia  </button>
                </div>
                <div className="nav-header">
                    <Link to="/">
                        <FaHome className="nav-button"/>
                    </Link>                
                    <div>Navbar</div>
                    <button type="button" className="button" onClick={toggleOver} >papia</button>
                    <div></div>
                </div>
            </nav>
        </>
     );
}
 
export default Navbar;