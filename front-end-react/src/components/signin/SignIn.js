import React from 'react';
// import signInImage from '../media/hotdog-signin.jpg';
import './SignIn.css';

class SignIn extends React.Component {
	constructor(props) {
			super(props);

			this.state = {
				apiResponse: [],
				user: {}
			};
		}


	componentDidMount() {
		fetch("/signin").then(res => res.json()).then(users => this.setState({apiResponse: users}));
	}

  validate() {
		if (this.state.apiResponse.length > 0) {
			var username = document.userData.user.value;
			var password = document.userData.pass.value;

			if (username === "" || password === "") {
					alert("Field cannot be blank");
			}
			else {  
				var allUsers = this.state.apiResponse;
				var user = allUsers.find(user => user.Email === username && user.Password === password);
				console.log(allUsers, user)
				if (user) {
					alert("Login Successful, Hello "+ user.FirstName + " " + user.LastName);

					fetch(`/signin/${user.id}`, {
						method: 'POST',
						headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						},
						body: JSON.stringify({id: user.id})
					}).then(response => response.json()).then(body => console.log(body));

					this.props.history.push(`/${user.type}`);

					window.location.reload(true);
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
        {/* <img src = {signInImage} className = "sign" alt="loading"/> */}
        <form name = "userData" className="userData"> 
          <label>Username: </label>
          <input type="text" name = "user" id="signin-user" />
          <label>Password: </label>
          <input type="password" name = "pass" id="signin-pass" />
          <input type="submit"  value="Log In"  name = "click"  onClick = {this.validate.bind(this)} /> 
        </form> 
      </div>
    );
  }
}

export default SignIn;