import React from 'react';
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

    render()
    {
        return(
            <div className = "signInPag">
                {<Form/>}
            </div>
            
        )
    }
    
}

export default Profile;