import React from 'react';

import './Help.css'


var Help = () => {
    return (
        <div className="help">
            <h1>Help menu</h1>
            <ul className = "theList">
                <li className = "faq"><a href="/help/FAQ">FAQ</a></li>
                <li className = 'wtf'><a href="/help/WTF">WTF</a></li>
                <li className = 'srsly'><a href="/help/FoReals">Srsly</a></li>
            </ul>

        </div>
    )
}

export default Help; 