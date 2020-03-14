import React from 'react';
import {Animated} from "react-animated-css";
import './Nav.css'

class Nav extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            user: props.user,
            showNav: 'hidden'
        }
    }

    toggleShowNav() {
        var css = (this.state.showNav === "hidden") ? "show" : "hidden";

        this.setState({showNav: css});
    }

    render() {
        var nav;

        switch(this.props.type) {
            case 'admin':
                nav = (
                    <div className="nav-container">
                        <button className="menu" onClick={() => this.toggleShowNav()}>MENU</button>
                        <div className={this.state.showNav}>
                            <nav className="nav">
                                <a href="/admin">Home</a>
                                <a href="/admin/about">About</a>
                                <a href="/admin/contact">Contact</a>
                                <a href="/admin/carts">Carts</a>
                                <a href="/admin/customers">Customers</a>
                                <a href="/admin/orders">Orders</a>
                                <a href="/admin/map">Map</a>
                                <a href="/admin/help">Help</a>
                                <a href="/signin">Log Out</a>
                            </nav>
                        </div>

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
                    <button className="menu" onClick={() => this.toggleShowNav()}>MENU</button>
                    <div className={this.state.showNav}>
                        <nav className="nav">
                        <a href="/customer">Home</a>
                            <a href="/customer/about">About</a>
                            <a href="/customer/contact">Contact</a>
                            <a href="/customer/order">Orders</a>
                            <a href="/customer/map">Map</a>
                            <a href="/customer/help">Help</a>
                            <a href="/signin">Log Out</a>
                        </nav>
                    </div>

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
                        <button className="menu" onClick={() => this.toggleShowNav()}>MENU</button>
                        <div className={this.state.showNav}>
                            <nav className="nav">
                            <a href="/vendor">Home</a>
                            <a href="/vendor/about">About</a>
                            <a href="/vendor/contact">Contact</a>
                            <a href="/vendor/help">Help</a>
                            <a href="/signin">Log Out</a>
                            </nav>
                        </div>
                        <div className="identification">
                            <h3>{this.props.user}</h3>
                            <h5>'Vendor'</h5>
                        </div>
                    </div> 
                ) 
                
                break;
            default:
                nav = (
                    <div className="nav-container">
                        <button className="menu" onClick={() => this.toggleShowNav()}>MENU</button>
                        <div className={this.state.showNav}>
                            <nav className="nav">
                            <a href="/">Home</a>
                            <a href="/about">About</a>
                            <a href="/contact">Contact</a>
                            <a href="/map">Map</a>
                            <a href="/help">Help</a>
                            <a href="/signin">SignIn</a>
                            <a href="/signup">Signup</a>
                            </nav>
                        </div>
                    </div> 
                ) 
        }
        
        return nav
    }
}    

export default Nav;