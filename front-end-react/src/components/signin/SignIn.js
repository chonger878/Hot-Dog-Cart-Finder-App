import React from 'react';
import signInImage from '../media/stop-signin.jpg';
import './SignInPage.css';

class SignIn extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    //will validate if the user info matches our database
    //if valid then bring user to map page
    validate() {
        let username = document.userData.user.value;
        let password = document.userData.pass.value;
        let isCorrectSignIn = false;

            //if username is blank
            if (username === "" || password === "")
            {
                alert("Field cannot be blank");
            }

            /*sign in is valid go to map
            matches the user information with data in our database*/
            else if (username === this.props.user && password === this.props.pass)
            {
                alert("login successful");
                //go to main App component via callback
                isCorrectSignIn = true;
                this.props.callbackFromParent(isCorrectSignIn);
            }
            
            //else username does not match our database, redo sign in
            else
            {
                alert("Incorrect sign in");
            }
         
    }

    render()
    {
        return(
            <div className = "signInPage">
               {/*sign in image*/}
               <img src = {signInImage} className = "sign"/>

               {/*form to input user info and call validate function*/}
               <form name = "userData"> 

                  Username: <input type="text" name = "user"/>
                  Password: <input type="text" name = "pass" />

                  {/*onClick syntax this.function.bind(this)*/}
                 <input type="submit" value="Log In" name = "click" onClick = {this.validate.bind(this)}/>
               </form>
            </div>
        );
    }
}

export default SignIn;