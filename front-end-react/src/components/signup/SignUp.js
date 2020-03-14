import profile from '../media/profile-logo.png';
import React from 'react';
import './SignUpPage.css';

//does not use axios
class SignUp extends React.Component {
    constructor(props) {
     super(props);
     this.state = {
       count: 11
     };

    //bind this to onSubmit to be used in handleSubmit
    this.onSubmit   = this.handleSubmit.bind(this);
    }

    //function to validate the user entries are valid for the database
    validate() {
      //validate no fields are blank
      //password strength ie numbers and string?
      //
    }
    //inputs user form data to the database as long as the data is valid
    handleSubmit(e) {
         e.preventDefault();
         //Trigger in database to only accept passwords longer than 8 chars and alphanum+special char
         //email address must have @
         if(this.refs.Password.value.length < 8)
         {
            alert("Password must be longer than 8 characters");
            document.userData.Password.focus();
         }
         var self = this; //assign self instead of this for body below
         this.setState({count: this.state.count + 1});
         //this.validate();
         //alert(this.count);
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
      }).then(response => response.json()).then(body => console.log(body));}     
      
     render() {
       return (
        <div className="SignUp">
           <h1 className ="head"> Sign Up</h1>
           <img src = {profile} className = "profile" alt="loading"/>
          <form name="userData" onSubmit={this.onSubmit}>
          
           ID: <input type="text" value={this.state.count} ref="SigninId"/> {/*id will always be valid using state.count*/ }
           Permission: <input type="text" value="None" ref="Permission"/> {/*always none*/ }
           
           Type:          <select ref="Type"> {/*type should be either vendor or customer, not admin*/ }
                            <option value="Vendor"  >Vendor</option>
                            <option value="Customer">Customer</option>
                          </select> 
           Email:<input type="email" name="Email" ref="Email"/> {/*change type to email for easier validation*/ }
           Password:<input type="password" name="Password" ref="Password"/>
           First Name:<input type="text"  ref="FirstName"/>
           Last Name:<input type="text"  ref="LastName"/>

           <input type="submit" value="Submit" />
         </form>
       </div>  
       )
     }   
    }     
    // <select ref="Type">
    //   <option value="Vendor">Vendor</option>
    //   <option value="Customer">Customer</option>
    // </select>
    //            Type:      <input type="text"  ref="Type"/> 
export default SignUp;