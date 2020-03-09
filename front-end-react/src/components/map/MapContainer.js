import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import './MapContainer.css'

const style = {
  maxWidth: '100%',
  maxHeight: '100%',
  margin: '0',
  border: 'solid 10px brown',
  borderRadius: '20px',
  display: 'block',
}

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carts: [],
      isCartSelected: false,
      selectedCart: []
    }
  }

  componentDidMount() {
    fetch("/carts").then(res => res.json()).then(carts => this.setState({carts: carts}));
 }

  addMarker = () => { // Davids's addMarker fn
    return this.state.carts.map((cart, index) => {
      return <Marker 
        key={index} 
        id={index} 
        position={JSON.parse(cart.coords)}
        // icon={cart.iconImage}
        onClick={() => this.setState({selectedCart: cart, isCartSelected: true})} />
    })
  }

  onCloseButtonClick() {
    this.setState({isCartSelected: false});
  }


  render() {
    return (
      <div className="map-container">
        <div className="map">
          <Map
            google={this.props.google}
            zoom={15}
            style={style}
            initialCenter={{lat: 47.6040, lng: -122.3250}}
          >
            {this.addMarker()}
          </Map>
        </div>
        <div className={`${this.state.isCartSelected}`}>
        <button id="closeButton" onClick={() => this.onCloseButtonClick()}>close</button>
          <div className = "cartInfo">
            <h3> {this.state.selectedCart.content}</h3>
            <p>{this.state.selectedCart.FirstName} {this.state.selectedCart.LastName}</p>
            <p>Hours: {this.state.selectedCart.DaysAWeek}</p>
            <p>Phone: {this.state.selectedCart.Phone}</p>
            <p>Email: {this.state.selectedCart.Email}</p>
            <p>Location: {this.state.selectedCart.Location}</p>
            <div className = 'menuDiv'>
              <h2 className = 'vendorMenu'>Menu:</h2>
              <p className = 'placeholder1'>blah</p>
              <p className = 'placeholder2'>blah blah</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper ({
  // https://console.cloud.google.com/google/maps-apis/apis/maps-embed-backend.googleapis.com/metrics?project=ad320-269405
  // apiKey: 'AIzaSyCJWUOedbDU0sEJpDAd_mZ93qSoPzpIFIw&libraries=places&callback=initMap'

  //The API key used below is the one Bob set up for the class, set to expire at the end of 
  //the quarter. The old one (set up by Farhad I think?) is pasted into the comment at the 
  //bottom of this file.
  apiKey: 'AIzaSyDEsKpLXZJY-Ch3s_UN152D7btqc7HOocQ'
})(MapContainer);


//AIzaSyCZ_DeGWRaw9b0ptA2vUJy55AlLcsF2KHE
