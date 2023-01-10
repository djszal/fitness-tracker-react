import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import "./Header.css";


const Header = () => {
    return(
        <>
        <div className="header">
            <h3>Fitness Trac.kr</h3>
            <div className="navbar">
                <Link to={'/'} className="nav-links">Home</Link>
                <Link to={'/routines'} className="nav-links">Routines</Link>
                <Link to={'/myroutines'} className="nav-links">My Routines</Link>
                <Link to={'/activities'} className="nav-links">Activities</Link>
                <Link to={'/login'} className="nav-links" >Login</Link>
                <Link to={'/login'} className="nav-links" >Logout</Link>
    
            </div>
        </div>
        </>
    )
    
}

export default Header;