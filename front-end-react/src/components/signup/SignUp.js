import profile from '../media/profile-logo.png';
import React from 'react';
import './SignUp.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 11
    };

    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    this.setState({count: this.state.count + 1});

    fetch('/signup', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
    
      body: JSON.stringify({
        Email: self.refs.Email.value,
        Password: self.refs.Password.value,
        FirstName: self.refs.FirstName.value,
        LastName: self.refs.LastName.value
      })
    }).then(response => response.json()).then(body => console.log(body));
  }     
      
    render() {
      return (
        <div className="SignUp">
          <img src = {profile} className = "profile" alt="loading"/>
          <form name = "userData" className="userData" onSubmit={this.onSubmit}> 
            <label for="type">Type: </label>
            <select ref="Type" id="signup-type">
              <option value="Vendor">Vendor</option>
              <option value="Customer">Customer</option>
            </select>
            <label for="firstName">FirstName: </label>
            <input type="text" ref="FirstName" id="signup-firstName" />
            <label for="lastName">LastName: </label>
            <input type="text" ref="LastName" id="signup-lastName" />
            <label for="email">Email: </label>
            <input type="text" ref="Email" id="signup-email" />
            <label for="password">Password: </label>
            <input type="password" ref="Password" id="signup-password" />
            <input  type="submit" value="Submit" /> 
          </form> 
        </div>  
      )
    }   
  }     

export default SignUp;