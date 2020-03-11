import React, {Component} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
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

  onDelete(id) {
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

    if (!status || !cartId || !customerId || !orderDate || items) {
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

  render() {
    var columns = [
      {Header: 'Status', accessor: 'status'},
      {Header: 'Cart Id', accessor: 'cartId'},
      {Header: 'Customer Id', accessor: 'customerId', filterable: false},
      {Header: 'Order Date', accessor: 'orderDate', filterable: false},
      {Header: 'items', accessor: 'items', filterable: false},

      {Header: "", filterable: false,
        Cell: props => {
          return <button className="" onClick={() =>  this.onDelete(props.original.id)}>Delete</button>
        }
      },
    ];

    var fields = ['Status', 'Cart Id', 'Customer Id', 'Order Date', 'items'];

    return (
      <div className="orders">
        <div className="list">
          <ReactTable 
          columns={columns}
          data={this.state.orders}
          filterable
          defaultPageSize={6}
          >

          </ReactTable>
          <button onClick={this.togglePopup.bind(this)}>Add orders</button>
          {
          this.state.showPopup ?  
            <Popup  
              closePopup={this.togglePopup.bind(this)}  
              data= {
                <div className="addOrdercontainer">
                  {fields.map((field, index) => (
                      <div className="addOrder" key={index}>
                        <label>{field}:       </label>
                        <input id={`${_.camelCase(field)}`} type="text" name={`${_.camelCase(field)}`} style={{width: 500}}/>
                      </div>
                  ))}
                  <button style={{width: 50}} onClick={(e) => this.add(e)}>Add</button>
                </div>
              }
            />  
            : null  
          }  
        </div>
      </div>
    );
  }
}

export default Orders;