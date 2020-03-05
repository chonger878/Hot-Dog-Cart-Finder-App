import React from 'react';
import {Link} from "react-router-dom";

import './Contact.css'

var Contact = () => {
    return (
        <div className="contactDiv">
            <h1 className = 'contactHeader'>Contact Us</h1>
            <p className = 'emailContact'>Email: support@hotdogfinder.com</p>
        </div>
    )
}

export default Contact;