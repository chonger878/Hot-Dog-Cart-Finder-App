import React, {Component} from 'react';
import Popup from '../popup/Popup';  
import _ from 'lodash';
import './Orders.css'

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      showPopup: false 
    };
  }

  componentDidMount() {
    fetch("/orders").then(res => res.json()).then(orders => this.setState({orders: orders}));
  }

  delete(id) {
    fetch(`/orders/${id}`, {
      method: 'DELETE',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },

      body: JSON.stringify({OrderID: id})
    }).then(response => response.json()).then(body => console.log(body));

    window.location.reload(true);
  }

  togglePopup() {  
    this.setState({showPopup: !this.state.showPopup});  
  }  

  add(e) {
    var status = document.getElementById('status').value;
    var cartId = document.getElementById('cartId').value;
    var customerId = document.getElementById('customerId').value;
    var orderDate = document.getElementById('orderDate').value;
    var items = document.getElementById('items').value;

    if (!status || !cartId || !customerId || !orderDate || !items) {
      alert('all fields are required.')
    }
    else {
      fetch('/orders', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          status: status, 
          cartId: cartId,
          customerId: customerId, 
          orderDate: orderDate,
          items: items
        })
      }).then(response => response.json()).then(body => console.log(body));

      window.location.reload(true);
      this.togglePopup.bind(this)
    }
  }

  renderTableData() {
    return this.state.orders.map((order, index) => {
       const {id, Status, CartId, CustomerId, OrderDate, Items} = order

       return (
          <tr key={index}>
            <td>{id}</td>
            <td>{Status}</td>
            <td>{CartId}</td>
            <td>{CustomerId}</td>
            <td>{OrderDate}</td>
            <td>{Items}</td>
            <td>
              <button onClick={(e) => this.delete(id)}>X</button>
              <button>UPDATE</button>
            </td>

          </tr>
       )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.state.orders[0])
    header.push('action');

    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
  }

 render() {
  var fields = ['Status', 'Cart Id', 'Customer Id', 'Order Date', 'items'];
console.log(this.state)
    return (
       <div className="orders-table">
          <table id='orders'>
             <tbody>
               {this.state.orders.length > 0 ? 
                  <div>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                  </div>
                   : <h1>loading ....</h1>
                }

             </tbody>
          </table>
          <button className="add-order" onClick={this.togglePopup.bind(this)}>+</button>
          {
          this.state.showPopup ?  
            <Popup  
              closePopup={this.togglePopup.bind(this)}  
              data= {
                <div className="inputs">
                  {fields.map((field, index) => (
                      <div className="addOrder" key={index}>
                        <label>{field}:       </label>
                        <input id={`${_.camelCase(field)}`} type="text" name={`${_.camelCase(field)}`} style={{width: 370}}/>
                      </div>
                  ))}
                  <button style={{width: 50}} onClick={(e) => this.add(e)}>Add</button>
                </div>
              }
            />  
            : null  
          }  
       </div>
    )
 }
}

export default Orders;