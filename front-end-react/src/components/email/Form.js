// import MyEmail from './Email';
// import { renderEmail } from 'react-html-email';
import React from 'react';

export default class extends React.Component {
  constructor(props) {
	super(props);
  this.state = { feedback: '',
                 name: 'Jack', 
                 email: 'ad320test1@gmail.com', 
                 password: '123456789'
                }
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
	return (
  	<form className="test-mailing">
    	<h1>Send me my account information</h1>
    	{/* <div>
      	<textarea
        	id="test-mailing"
        	name="test-mailing"
        	onChange={this.handleChange}
        	placeholder="Post some lorem ipsum here"
        	required
        	value={this.state.feedback}
        	style={{width: '100%', height: '150px'}}
      	/>
    	</div> */}
    	<input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} />
  	</form>
	)
  }

  handleChange(event) {
    this.setState({feedback: event.target.value})
  }

  handleSubmit(event) {

    // const messageHtml =  renderEmail(
    //     <MyEmail name={this.state.name}> {this.state.feedback}</MyEmail>
    // );
      // alert(this.state.name);
            fetch('/customer/profile', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
    
                data: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    messageHtml: this.messageHtml,
                    password: this.password
                })
                
              }).then((response) => response.json()).then(data => console.log(data)); 
              console.log("Email sent Successfully");  
              alert("Email Sent Successfully!")     
    }
}        