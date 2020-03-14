import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import './MapContainer.css'
import image from '../media/cart2.jpg';

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
            <p>Phone: {this.state.selectedCart.Phone}</p>
            <p>Email: {this.state.selectedCart.Email}</p>
            <p>Location: {this.state.selectedCart.Location}</p>
          </div>
          <img className="cart-image" src={image} style={{width: 230, height: 230}}/>
          <div className="cart-menu">menu</div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper ({
  // https://console.cloud.google.com/google/maps-apis/apis/maps-embed-backend.googleapis.com/metrics?project=ad320-269405
  // apiKey: 'AIzaSyCJWUOedbDU0sEJpDAd_mZ93qSoPzpIFIw&libraries=places&callback=initMap'
  apiKey: 'AIzaSyDEsKpLXZJY-Ch3s_UN152D7btqc7HOocQ'
})(MapContainer);