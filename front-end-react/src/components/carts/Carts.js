import React, {Component} from 'react';
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

  delete(id) {
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

  renderTableData() {
    return this.state.carts.map((cart, index) => {
       const {id, FirstName, LastName, Phone, Email, Location, content, coords} = cart

       return (
          <tr key={index}>
            <td>{id}</td>
            <td>{FirstName}</td>
            <td>{LastName}</td>
            <td>{Phone}</td>
            <td>{Email}</td>
            <td>{Location}</td>
            <td>{coords}</td>
            <td>{content}</td>
            <td>
              <button onClick={(e) =>  this.delete(id)}>X</button>
              <button>UPDATE</button>
            </td>
          </tr>
       )
    })
  }

  renderTableHeader() {
    var header = Object.keys(this.state.carts[0])
    header.push('action');

    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
  }

 render() {
    var fields = ['First Name', 'Last Name', 'Phone', 'Email', 'Location', 'content', 'coords'];

    return (
       <div className="carts-table">
          <table id='carts'>
             <tbody>
               {this.state.carts.length > 0 ? 
                  <div>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                  </div>
                   : <h1>loading ....</h1>
                }
             </tbody>
          </table>
          <button className="add-cart" variant="contained" onClick={this.togglePopup.bind(this)}>+</button>
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
                            <input id="lat" type="text" name="lat" placeholder="lat" style={{width: 370}}/>
                            <input id="lng" type="text" name="lng" placeholder="lng" style={{width: 370}}/>
                          </div>
                          :
                          <input id={`${_.camelCase(field)}`} type="text" name={`${_.camelCase(field)}`} style={{width: 370}}/>
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
    )
 }
}

export default Carts;