//import profile from '../media/profile-logo.png';
import React from 'react';
import './SignUp.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 16,
      errorOccured: false
    };

    this.onSubmit = this.handleSubmit.bind(this);
  }

  // componentDidCatch(error, info)
  // {
  //   this.setState({errorOccured: true})
  //   alert("hi");
  // }

  handleSubmit(e) {
    e.preventDefault();
    if(this.refs.Password.value.length < 8)
    {
       alert("Password must be longer than 8 characters");
      //  document.userData.Password.focus();
      //set user back to same form
    }    
    else if(this.refs.FirstName.value === "" || this.refs.LastName.value === "" || this.refs.Email.value === "")
    {
      alert("Field cannot be blank");
    }
    else{
      var self = this;
      this.setState({count: this.state.count + 1});
      fetch('/signup', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          SigninId: self.refs.SigninId.value, 
          Permission: self.refs.Permission.value,
          Type: self.refs.Type.value, 
          Email: self.refs.Email.value,
          Password: self.refs.Password.value,
          FirstName: self.refs.FirstName.value,
          LastName: self.refs.LastName.value
        })
      }).then(response => response.json()).then(body => console.log(body));
    } 
  }     
      
    render() {
      return (
        <div className="SignUp">
          {/* <img src = {profile} className = "profile" alt="loading"/> */}
          <form name = "userData" className="userData" onSubmit={this.onSubmit}> 
          <label for="ID"> ID Number: </label>
          <input type="text"  value={this.state.count} ref = "SigninId" id="signup-ID"/> 
          <label for="permission">Permission: </label>
          <input type="text" ref = "Permission" value="None" id="signup-permission"/> 
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