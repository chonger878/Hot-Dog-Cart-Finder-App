import React from 'react';

import './Nav.css'

class Nav extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            user: props.user
        }
    }

    render() {
        var nav;

        switch(this.props.type) {
            case 'admin':
                nav = (
                    <div className="nav-container">
                        <nav className="nav">
                            <ul className="nav-links">
                                <li><a href="/admin">Home</a></li>
                                <li><a href="/admin/about">About</a></li>
                                <li><a href="/admin/contact">Contact</a></li>
                                <li><a href="/admin/carts">Carts</a></li>
                                <li><a href="/admin/map">Map</a></li>
                                <li><a href="/admin/help">Help</a></li>
                                <li><a href="/signin">Log Out</a></li>
                            </ul>
                        </nav>
                        <div className="identification">
                            <h3>{this.props.user}</h3>
                            <h5>'Admin'</h5>
                        </div>
                    </div>
                )
    
                break;
            case 'customer':
                nav = (
                    <div className="nav-container">
                        <nav className="nav">
                            <ul className="nav-links">
                                <li><a href="/customer">Home</a></li>
                                <li><a href="/customer/about">About</a></li>
                                <li><a href="/customer/contact">Contact</a></li>
                                <li><a href="/customer/map">Map</a></li>
                                <li><a href="/customer/help">Help</a></li>
                                <li><a href="/signin">Log Out</a></li>
                            </ul>
                        </nav>
                        <div className="identification">
                            <h3>{this.props.user}</h3>
                            <h5>'Customer'</h5>
                        </div>
                    </div>
                ) 
    
                    break;
            case 'vendor':
                nav = (
                    <div className="nav-container">
                        <nav className="nav">
                            <ul className="nav-links">
                                <li><a href="/vendor">Home</a></li>
                                <li><a href="/vendor/about">About</a></li>
                                <li><a href="/vendor/contact">Contact</a></li>
                                <li><a href="/vendor/help">Help</a></li>
                                <li><a href="/signin">Log Out</a></li>
                            </ul>
                        </nav>
                        <div className="identification">
                            <h3>{this.props.user}</h3>
                            <h5>'Vendor'</h5>
                        </div>
                    </div>
                ) 
                
                break;
            default:
                nav = (
                    <nav className="nav">
                        <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/map">Map</a></li>
                        <li><a href="/help">Help</a></li>
                        <li><a href="/signin">SignIn</a></li>
                        <li><a href="/signup">Signup</a></li>
                        </ul>
                    </nav>
                ) 
        }
        
        return nav;
    }
}    

export default Nav;