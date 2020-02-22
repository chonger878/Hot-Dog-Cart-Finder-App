import React from 'react';
import './Footer.css';


var Footer = props => {
    return (
        <header className="footer">
            <nav className="footer-nav">
                <div></div>
                <div className="spacer"></div>
                <div className="footer-nav-items">
                    <ul>
                        <li><a href="/">CONTACT</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Footer;