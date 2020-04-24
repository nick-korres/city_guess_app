import React from 'react';
// import styled from 'styled-components';
import { FaHome } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "../css/Navbar.css"

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="nav-header">
                    
                        {/* <Link to="/">
                            <FaHome className="nav-button"/>
                        </Link> */}
                    <Link to="/">
                        <FaHome className="nav-button"/>
                    </Link>                
                    <div>Navbar</div>
                    <div></div>
                </div>
            </nav>
        </>
     );
}
 
export default Navbar;