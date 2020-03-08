import React, {Component} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
import Popup from '../popup/Popup';  
import _ from 'lodash';
import './Carts.css'

class Carts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carts: [],
      showPopup: false 
    };
  }

  componentDidMount() {
    fetch("/carts").then(res => res.json()).then(carts => this.setState({carts: carts}));
  }

  onDelete(id) {
    fetch(`/carts/${id}`, {
      method: 'DELETE',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },

      body: JSON.stringify({VendorID: id})
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
    var location = document.getElementById('location').value;
    var lat = document.getElementById('lat').value;
    var lng = document.getElementById('lng').value;
    var content = document.getElementById('content').value;
    var coords = JSON.stringify({lat, lng});

    if (!firstName || !lastName || !phone || !email || !location) {
      alert('all fields are required.')
    }
    else {
      fetch('/carts', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          firstName: firstName, 
          lastName: lastName,
          phone: phone, 
          email: email, 
          location: location,
          content: content,
          coords: coords
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
      {Header: "Location", accessor: 'Location', filterable: false},
      {Header: "Content", accessor: 'content', filterable: false},
      {Header: "coords", accessor: 'coords', filterable: false},
      {Header: "", filterable: false,
        Cell: props => {
          return <button className="" onClick={() =>  this.onDelete(props.original.id)}>Delete</button>
        }
      },
    ];

    var fields = ['First Name', 'Last Name', 'Phone', 'Email', 'Location', 'content', 'coords'];

    return (
      <div className="carts">
        <div className="list">
          <ReactTable 
          columns={columns}
          data={this.state.carts}
          filterable
          defaultPageSize={6}
          >

          </ReactTable>
          <button onClick={this.togglePopup.bind(this)}>Add Cart</button>
          {
          this.state.showPopup ?  
            <Popup  
              closePopup={this.togglePopup.bind(this)}  
              data= {
                <div className="addCartcontainer">
                  {fields.map((field, index) => (
                      <div className="addCart" key={index}>
                        <label>{field}:       </label>
                        {field === 'coords' ? 
                          <div>
                            <input id="lat" type="text" name="lat" placeholder="lat" style={{width: 500}}/>
                            <input id="lng" type="text" name="lng" placeholder="lng" style={{width: 500}}/>
                          </div>
                          :
                          <input id={`${_.camelCase(field)}`} type="text" name={`${_.camelCase(field)}`} style={{width: 500}}/>
                        }
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

export default Carts;