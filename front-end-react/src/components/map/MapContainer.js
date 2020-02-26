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
        icon={cart.iconImage}
        onClick={() => this.setState({selectedCart: cart, isCartSelected: true})} />
    })
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
          <h3>cart number: {this.state.selectedCart.content}</h3>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper ({
  // https://console.cloud.google.com/google/maps-apis/apis/maps-embed-backend.googleapis.com/metrics?project=ad320-269405
  // apiKey: 'AIzaSyCJWUOedbDU0sEJpDAd_mZ93qSoPzpIFIw&libraries=places&callback=initMap'
  apiKey: 'AIzaSyCZ_DeGWRaw9b0ptA2vUJy55AlLcsF2KHE'
})(MapContainer);