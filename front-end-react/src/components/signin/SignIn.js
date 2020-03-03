import React from 'react';
//import signInImage from '../media/profile-logo.png';
import signInImage from '../media/hotdog-signin.jpg';
import './SignInPage.css';
import axios from 'axios';

//tasks: setup sign in to validate comparing all users in customer table instead of one.
class SignIn extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {apiResponse: [],
          //DataFromChild: false
        };
      }
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
        let username = document.userData.user.value;
        let password = document.userData.pass.value;
        //let isCorrectSignIn = false;
            //alert(databaseUsername);
            //alert(databasePassword);
            //if username is blank
            if (username === "" || password === "")
            {
                alert("Field cannot be blank");
            }

            /*sign in is valid go to map
            matches the user information with data in our database*/
            else if (username === databaseEmail && password === databasePassword)
            {
                alert("Login Successful, Hello "+ FirstName + " " + LastName);
                
                //go to main App component via callback
                //isCorrectSignIn = true;
                //this.props.callbackFromParent(isCorrectSignIn);
            }
            
            //else username does not match our database, redo sign in
            else
            {
                alert("Sign in does not match our records");
            }
         
    }
    //code fragment to grab data from database
    // {this.state.apiResponse.map(resource => (
    //     <div>
    //     Email: {resource.Email} Password: {resource.Password}
    //     <SignIn callbackFromParent={this.myCallback} user={resource.Email} pass={resource.Password}/> 
    //     </div>
    //   ))}
    render()
    {
        return(
            <div className = "signInPage">
               
               {/*sign in image*/}
               <img src = {signInImage} className = "sign"/>

               {/*form to input user info and call validate function*/}
               <form name = "userData"> 

                  Username: <input type= "text" name = "user"/>
                  Password: <input type= "text" name = "pass" />

                 {/*onClick syntax this.function.bind(this)*/} 
                 {/* <input type="submit" value="Log In" name = "click" onClick = {this.validate.bind(this)}/> */}
                 {this.state.apiResponse.map(resource => ( 
                     <div>
                        {/*test database data is coming through*/}
                        {/* Email: {resource.Email} Password: {resource.Password} */}
                        <input type="submit" value="Log In" name = "click" onClick = {this.validate.bind(this, resource.Email, resource.Password, resource.FirstName, resource.LastName)}/>   
                        {/*sign up link*/}
                        <a href="/signup">Signup</a>
                    </div>
                 ))}
               </form>
               
            </div>
        );
    }
}

export default SignIn;