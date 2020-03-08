import React, {Component} from 'react';
// import './Cart.css'

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {cart: ''};
  }

  componentDidMount() {
    fetch(`/carts/${this.props.match.params.id}`).then(res => res.json()).then(cart => this.setState({cart}));
  }

  render() {
    var cart = this.state.cart[0];
    
    return (
      <div className="cart">
          <h1>{cart ? cart.FirstName : 'loading ....'}</h1>
      </div>
    );
  }
}

export default Cart;