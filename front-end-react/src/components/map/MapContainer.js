import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import './MapContainer.css'

const style = {
  maxWidth: '100%',
  maxHeight: '100%',
  margin: '0',
  border: 'solid 10px #F00',
  borderRadius: '20px',
  display: 'block',
}

const iconImage = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carts: [// David's Mrkers
        {
          coords: {lat: 47.6010, lng: -122.3290},
          iconImage,
          content: "Cart 1"
        },
        {
          coords: {lat: 47.6040, lng: -122.3260},
          iconImage,
          content: "Cart 2"
        },
        {
          coords: {lat: 47.6050, lng: -122.3240},
          iconImage,
          content: "Cart 3"
        }
      ]
    }
  }

  addMarker = () => { // Davids's addMarker fn
    return this.state.carts.map((cart, index) => {
      return <Marker 
        key={index} 
        id={index} 
        position={{lat: cart.coords.lat, lng: cart.coords.lng}}
        icon={cart.iconImage}
        onClick={() => alert(`${cart.content}`)} />
    })
  }


  render() {
    return (
      <div className="map-container">
        <h1 id="pageHeader">Hot Dog Finder</h1>
        <Map
          google={this.props.google}
          zoom={15}
          style={style}
          initialCenter={{ lat: 47.6010, lng: -122.3290}}
        >
          {this.addMarker()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper ({
  apiKey: 'AIzaSyCJWUOedbDU0sEJpDAd_mZ93qSoPzpIFIw&libraries=places&callback=initMap'
})(MapContainer);