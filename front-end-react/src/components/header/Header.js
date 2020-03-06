import React from 'react';
import './Header.css';


var Header = props => {
    return (
        <header className="header">
            <nav className="header-nav">
                <div></div>
                <div className="header-logo">
                    <img src={require('../media/logo.jpg')} alt="loading..."/>   
                    <h3>Hot Dog Finder</h3>
                </div>
                <div className="spacer"></div>
                <div className="header-nav-items">
                </div>
            </nav>
        </header>
    )
}

export default Header;