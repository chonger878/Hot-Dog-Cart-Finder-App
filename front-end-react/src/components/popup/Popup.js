import React from 'react';  
import './Popup.css';  

class Popup extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
          data: props.data
        };
    }

    render() {  
        return (  
            <div className='popup'>  
                <div className='popupData'>  
                    <button className="popup-button" onClick={this.props.closePopup}>X</button>  
                    <div>{this.props.data}</div>  
                </div>  
            </div>  
        );  
    }  
}  

export default Popup;