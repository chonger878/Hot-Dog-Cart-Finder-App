import React from 'react';
// import signInImage from '../media/profile-logo.png';
import signInImage from '../media/hotdog-signin.jpg';
import './SignIn.css';
import _ from 'lodash'

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          apiResponse: []
        };
      }

    componentDidMount() {
      fetch("/signin").then(res => res.json()).then(users => this.setState({apiResponse: users}));
    }

    validate() {
      if (this.state.apiResponse.length > 0) {
        let username = document.userData.user.value;
        let password = document.userData.pass.value;
  
        if (username === "" || password === "") {
            alert("Field cannot be blank");
        }
        else {  
          var allUsers = this.state.apiResponse;
  
          var user = allUsers.find(user => user.Email === username && user.Password === password);
          if (user) {
            alert("Login Successful, Hello "+ user.FirstName + " " + user.LastName);
  
            this.props.history.push(`/${user.type}`);
  
            window.location.reload(true);

            this.props.user(_.join([user.FirstName, user.LastName], ', '))
          }
          else {
            alert("Sign in does not match our records");
          }
        }
      }
    }

  render() {
    return(
      <div className = "signInPage">
        <img src = {signInImage} className = "sign" alt="loading"/>
        <form name = "userData" className="userData"> 
          <label for="username">Username: </label>
          <input type="text" name = "user" id="signin-user" />
          <label for="password">Password: </label>
          <input type="password" name = "pass" id="signin-pass" />
          <input type="submit"  value="Log In"  name = "click"  onClick = {this.validate.bind(this)} /> 
        </form> 
      </div>
    );
  }
}

export default SignIn;