import React, {Component} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
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

  onDelete(id) {
    fetch(`/customers/${id}`, {
      method: 'DELETE',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },

      body: JSON.stringify({CustomerId: id})
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

  render() {
    var columns = [
      {Header: 'First Name', accessor: 'FirstName'},
      {Header: 'Last Name', accessor: 'LastName'},
      {Header: 'Phone', accessor: 'Phone', filterable: false},
      {Header: 'Email', accessor: 'Email', filterable: false},
      {Header: "", filterable: false,
        Cell: props => {
          return <button className="" onClick={() =>  this.onDelete(props.original.id)}>Delete</button>
        }
      },
    ];

    var fields = ['First Name', 'Last Name', 'Phone', 'Email'];

    return (
      <div className="customers">
        <div className="list">
          <ReactTable 
          columns={columns}
          data={this.state.customers}
          filterable
          defaultPageSize={6}
          >

          </ReactTable>
          <button onClick={this.togglePopup.bind(this)}>Add Customers</button>
          {
          this.state.showPopup ?  
            <Popup  
              closePopup={this.togglePopup.bind(this)}  
              data= {
                <div className="addCostomercontainer">
                  {fields.map((field, index) => (
                      <div className="addCustomer" key={index}>
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

export default Customers;