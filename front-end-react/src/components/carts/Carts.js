import React, {Component} from 'react';

class Carts extends Component {
  constructor(props) {
    super(props);
    this.state = {carts: []};
  }

  componentDidMount() { // we can add a handler instead of this biuld in function
    fetch("/carts").then(res => res.json()).then(carts => this.setState({carts: carts}));
 }

  render() {
    return (
      <div>
          {this.state.carts.map(cart => (
              <h6>name: {cart.FirstName}</h6>
          ))}
      </div>
    );
  }
}

export default Carts;