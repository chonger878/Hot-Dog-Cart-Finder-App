import React, {Component} from 'react';
import {Link} from "react-router-dom";

import './Nav.css'

var Nav = () => {
    return (
        <nav className="nav">
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/carts">Carts</a></li>
                <li><a href="/map">Map</a></li>
            </ul>
        </nav>
    );
}

export default Nav;