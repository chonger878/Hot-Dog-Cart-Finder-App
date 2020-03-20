import React from 'react';
// import signInImage from '../media/hotdog-signin.jpg';
import './Profile.css';
import Form from '../email/Form';

//grab signed in users info from db and display for customer and vendor
class Profile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            apiResponse: [],
            user: {}
        }

    }

    // componentDidMount() {
	// 	fetch("/profile").then(res => res.json()).then(users => this.setState({apiResponse: users}));
	// }   

    // info()
    // {
    //     let allUsers = this.state.apiResponse;
    //     // let user = allUsers.find(user => user.Email === username && user.Password === password);
    // }
    render()
    {
        return(
            <div className = "signInPag">
                {/* <img className="profileImage" src = {signInImage} className = "sign" alt="loading"/> */}
                {<Form/>}
                {/* {users.FirstName} */}

            </div>
            
        )
    }
    
}

export default Profile;