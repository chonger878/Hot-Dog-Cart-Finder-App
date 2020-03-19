import React, {Component} from 'react';
import Popup from '../popup/Popup';  
import _ from 'lodash';
import './Customers.css'

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      showPopup: false 
    };
  }

  componentDidMount() {
    fetch("/customers").then(res => res.json()).then(customers => this.setState({customers: customers}));
  }

  delete(id) {
    fetch(`/customers/${id}`, {
      method: 'DELETE',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },

      body: JSON.stringify({CustomerID: id})
    }).then(response => response.json()).then(body => console.log(body));

    window.location.reload(true);
  }

  togglePopup() {  
    this.setState({showPopup: !this.state.showPopup});  
  }  

  add(e) {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    if (!firstName || !lastName || !phone || !email) {
      alert('all fields are required.')
    }
    else {
      fetch('/customers', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          firstName: firstName, 
          lastName: lastName,
          phone: phone, 
          email: email
        })
      }).then(response => response.json()).then(body => console.log(body));

      window.location.reload(true);
      this.togglePopup.bind(this)
    }
  }

  renderTableData() {
    return this.state.customers.map((customer, index) => {
       const {id, FirstName, LastName, Phone, Email} = customer

       return (
          <tr key={index}>
            <td>{id}</td>
            <td>{FirstName}</td>
            <td>{LastName}</td>
            <td>{Phone}</td>
            <td>{Email}</td>
            <td>
              <button onClick={() =>  this.delete(id)}>X</button>
              <button>UPDATE</button>
            </td>

          </tr>
       )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.state.customers[0])
    header.push('action');

    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
  }

 render() {
    var fields = ['First Name', 'Last Name', 'Phone', 'Email'];

    return (
       <div className="customers-table">
          <table id='customers'>
             <tbody>
               {this.state.customers.length > 0 ? 
                  <div>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                  </div>
                   : <tr></tr>
                }

             </tbody>
          </table>
          <button className="add-customer" onClick={this.togglePopup.bind(this)}>+</button>
          {
          this.state.showPopup ?  
            <Popup  
              closePopup={this.togglePopup.bind(this)}  
              data= {
                <div>
                  {fields.map((field, index) => (
                      <div className="addCart" key={index}>
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

export default Customers;