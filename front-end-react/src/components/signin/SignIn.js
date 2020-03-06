import signInImage from '../media/logo.jpg';
import React from 'react';
<<<<<<< HEAD
=======
//import signInImage from '../media/profile-logo.png';
import signInImage from '../media/hotdog-signin.jpg';
>>>>>>> master
import './SignInPage.css';
import _ from 'lodash'

<<<<<<< HEAD
class SignIn extends React.Component {
=======
//tasks: setup sign in to validate comparing all users in customer table instead of one.
class SignIn extends React.Component
{
>>>>>>> master
    constructor(props) {
        super(props);

        this.state = {
          apiResponse: []
        };
      }
<<<<<<< HEAD

    componentDidMount() {
      fetch("/signin").then(res => res.json()).then(users => this.setState({apiResponse: users}));
    }

    validate() {
      if (this.state.apiResponse.length > 0) {
=======
    //   myCallback = (isCorrectSignIn) => {// when the callback sent to SignIn is altered, it is now usable in the App
    //     this.setState({ DataFromChild: isCorrectSignIn});
    //   }
    
      componentWillMount() { // we can add a handler instead of this biuld in function
        axios("http://localhost:9000/signin").then(res => this.setState({apiResponse: res.data}));
      }

    //will validate if the user info matches our database
    //if valid then bring user to map page
    //??strange error with datatype conversion into validate. switches param order and turns databaseUsername to object
    validate(databaseEmail, databasePassword, FirstName, LastName) {
>>>>>>> master
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
        <form name = "userData"> 
          Username: <input type="text" name = "user"/>
          Password: <input type="text" name = "pass" />

          <div>
            <input type="submit"  value="Log In"  name = "click"  onClick = {this.validate.bind(this)} /> 
                        
            {/* <a href="/signup">Signup</a> */}
          </div>
        </form> 
      </div>
    );
  }
}

export default SignIn;