import React, {Component, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './Carts.css'

class Carts extends Component {
  constructor(props) {
    super(props);
    this.state = {carts: []};
  }

  componentDidMount() {
    fetch("/carts").then(res => res.json()).then(carts => this.setState({carts: carts}));
  }

  render() {
    return (
      <div className="carts">
        <div className="list">
          {this.state.carts.map(cart => (
            <Link to={`/carts/${cart.id}`}>
              <div className="items">{cart.FirstName}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Carts;