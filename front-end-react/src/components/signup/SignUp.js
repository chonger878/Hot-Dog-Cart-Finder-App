import profile from '../media/profile-logo.png';
import React from 'react';
import axios from 'axios';
import './SignUpPage.css';

class SignUp extends React.Component {
    constructor(props) {
     super(props)
            this.state = {
             persons: [],
             users: []
           }

        //    this.handleidChange         = this.handleidChange.bind(this);
        //    this.handlePermissionChange = this.handlePermissionChange.bind(this);
        //    this.handleEmailChange     = this.handleEmailChange.bind(this);
        //    this.handleTypeChange      = this.handleTypeChange.bind(this);
        //    this.handlePasswordChange  = this.handlePasswordChange.bind(this);
        //    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        //    this.handleLastNameChange  = this.handleLastNameChange.bind(this);
           this.onSubmit              = this.handleSubmit.bind(this);
          
         }
    //  handleidChange(e) {
    //    this.setState({id: e.target.value})
    //  }
    //  handlePermissionChange(e) {
    //     this.setState({Permission: e.target.value})
    //   }     
    //  handleEmailChange(e) {
    //    this.setState({Email: e.target.value})
    //  }
    //  handleTypeChange(e) {
    //    this.setState({Type: e.target.value})
    //  }
    //  handlePasswordChange(e) {
    //    this.setState({Password: e.target.value})
    //  }
    //  handleFirstNameChange(e) {
    //    this.setState({FirstName: e.target.value})
    //  }
    //  handleLastNameChange(e) {
    //    this.setState({LastName: e.target.value})
    //  }
    //  componentDidMount() {
    //    axios.get(`http://localhost:3000/`)
    //      .then(res => {
    //        const persons = res.data;
    //        this.setState({ persons });
    //      })
    //  }  
    
     handleSubmit(e) {
         e.preventDefault();
         var self = this;
         fetch('/signup',{
             method: 'POST',
             data: {
                 SigninId: self.refs.SigninId,
                 Permission: self.refs.Permission,
                 Type: self.refs.Type,
                 Email: self.refs.Email,
                 Password: self.refs.Password,
                 FirstName: self.refs.FirstName,
                 LastName: self.refs.LastName
             }
         })
         .then(function(response){
             return response.json()
         }).then(function(body){
             console.log(body);
         });
        }
        //  const user = {
        //    id: this.state.id,
        //    Permission: this.state.Permission,
        //    Type: this.state.Type,
        //    Email: this.state.Email,
        //    Password: this.state.Password,
        //    FirstName: this.state.FirstName,
        //    LastName: this.state.LastName,
        //  }
         //alert(user.toSource());//alert all oobject properties
        //  axios.post('http://localhost:3000/', user)
        //  .then(res => {
        //      const persons = res.data;
        //      this.setState({ persons });
        //    })         
       
      
     render() {
       return (
        <div className="SignUp">
           <h1> Sign Up</h1>
           <img src = {profile} className = "profile" alt="loading"/>
          <form onSubmit={this.onSubmit}>
           <input type="text" value="100"  ref="SigninId"/>
           <input type="text" value="a" ref="Permission"/>
           <input type="text" value="a" ref="Type"/>
           <input type="text"  value="a" ref="Email"/>
           <input type="text"  value="a" ref="Password" />
           <input type="text"  value="a" ref="FirstName" />
           <input type="text"  value="a" ref="LastName" />

           <input type="submit" value="Submit" />
         </form>
       </div>  
       )
     }   
    }     
    //    <div className="SignUp">
    //        <h1> Sign Up</h1>
    //        <img src = {profile} className = "profile" alt="loading"/>
    //       <form onSubmit={this.onSubmit} method="user" className="right">
    //        <label>
    //        <span>id:</span>
    //        <input type="text" name="user_id" onChange={this.handleidChange}/>
    //        </label>
    //        <label>
    //        <span>Permission:</span>
    //        <input type="text" name="Permission" onChange={this.handlePermissionChange}/>
    //        </label>           
    //        <label>
    //        <span>Type:</span>
    //        <input type="text" name="Type" onChange={this.handleTypeChange}/>
    //        </label>
    //        <label>
    //        <span>Email:</span>
    //        <input type="text" name="Email" onChange={this.handleEmailChange}/>
    //        </label>
    //        <label>
    //        <span>Password:</span>
    //        <input type="text" name="Password"onChange={this.handlePasswordChange} />
    //        </label>
    //        <label>
    //        <span>FirstName:</span>
    //        <input type="text" name="FirstName" onChange={this.handleFirstNameChange} />
    //        </label>
    //        <label>
    //        <span>LastName:</span>
    //        <input type="text" name="LastName" onChange={this.handleLastNameChange} />
    //        </label>
    //        <input type="submit" value="Submit" />
    //      </form>
    //    </div>
//       );
//      }
//    //}

export default SignUp;