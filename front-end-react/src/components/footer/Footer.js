import React from 'react';
import './Footer.css';

var Footer = props => {
    return (
        <header className="footer">
            <nav className="footer-nav">
                <div className="footer-nav-items">
                    <ul>
                        <li><a href="/users">CONTACT US</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Footer;