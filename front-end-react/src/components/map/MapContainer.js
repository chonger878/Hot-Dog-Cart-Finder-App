import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import './MapContainer.css'
import image from '../media/cart2.jpg';
import _ from 'lodash';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carts: [],
      isCartSelected: false,
      selectedCart: [],
      menu: [],
      myCartItems: []
    }
  }

  componentDidMount() {
    fetch("/carts").then(res => res.json()).then(carts => this.setState({carts: carts}));
  }

  addMarker = () => { // Davids's addMarker fn
    return this.state.carts.map((cart, index) => {
      return (
      <Marker 
        key={index} 
        id={index} 
        position={JSON.parse(cart.coords)}
        onClick={() => {
          this.setState({selectedCart: cart, isCartSelected: true});

          fetch(`/menu/${this.state.selectedCart.id}`).then(res => res.json()).then(menu => {

            var menuItems = [];

            _.forEach(menu, item => {
              item.no = 0;

              menuItems.push(item);
            });

            this.setState({menu: menu})
          });
        }} />
      )  
    })
  }

  onCloseButtonClick() {
    this.setState({isCartSelected: false});
  }

  addToCart(e) {
  }

  updateNo(value, title) {
    var myCartItems =  _.clone(this.state.myCartItems);

    _.forEach(myCartItems, item => {
      if (item.title === title) item.no = value;
    });

    this.setState({myCartItems});
  }

  renderTableHeader() {
    var header = _.keys(this.state.menu[0]);

    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
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
          <img className="cart-image" src={image} alt="loading ..."/>
          <table className="cart-menu">
            <thead>
              <tr>{this.renderTableHeader()}</tr>
            </thead>
            <tbody>
              {
              this.state.menu.map((menu, index) => {
                const {title, price, type} = menu

                return (
                  <tr key={index}>
                    <td>{title}</td>
                    <td>{price}</td>
                    <td>{type}</td>
                    <td>
                      <input type="text" placeholder="0" onChange={(e) => this.updateNo(e.target.value, title)} style={{width: 20}}></input>
                    </td>
                </tr>
                )
              })}
            </tbody>
          </table>
          <div className="my-cart">
          <button className="my-cart-submit" onClick={(e) => this.addToCart(e)}>Submit</button>
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
