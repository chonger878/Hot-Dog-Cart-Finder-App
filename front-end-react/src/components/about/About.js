import React from 'react';
import {Link} from "react-router-dom";

import './About.css'

var About = () => {
    return (
        <div className = "OverallDiv">
            <div className = "AboutHeader">
                <h1 className = "header2">About Us</h1>
            </div>
            <div className="AboutMainBlock">
                <p className = "statement">
                    We here at Hot Dog Finder believe that a good dog is hard to find. That's where
                    we come in; with our cutting-edge web technology, we find you the locations of 
                    Seattle's many Hot Dog Carts, and provide you with all the information you need
                    to find just the right dog for you. Want a brat? Maybe a Chicago-style? Our app
                    gives you all the pertinent info for any vendor, including their current location,
                    hours of operation, phone number, and more! Now go get a dog!
                </p>
            </div>
        </div>
    )
}

export default About;