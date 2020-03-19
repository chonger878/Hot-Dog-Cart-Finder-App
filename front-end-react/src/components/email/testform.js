import MyEmail from './Email';
import { renderEmail } from 'react-html-email';
import React from 'react';

export default class extends React.Component {
  constructor(props) {
	super(props);
	this.state = { feedback: '', name: 'Name', email: 'ad320test1@gmail.com'}
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
	return (
  	<form className="test-mailing">
    	<h1>Let's see if it works</h1>
    	<div>
      	<textarea
        	id="test-mailing"
        	name="test-mailing"
        	onChange={this.handleChange}
        	placeholder="Post some lorem ipsum here"
        	required
        	value={this.state.feedback}
        	style={{width: '100%', height: '150px'}}
      	/>
    	</div>
    	<input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} />
  	</form>
	)
  }

  handleChange(event) {
    this.setState({feedback: event.target.value})
  }

  handleSubmit(event) {

    const messageHtml =  renderEmail(
        <MyEmail name={this.state.name}> {this.state.feedback}</MyEmail>
    );
    
            // axios({
            //     method: "POST", 
            //     url:"http://localhost:3000/customer/profile", 
            //     data: {
            //     name: this.state.name,
            //     email: this.state.email,
            //     messageHtml: messageHtml
            //     }
            // }).then((response)=>{
            //     if (response.data.msg === 'success'){
            //         alert("Email sent, awesome!"); 
            //         this.resetForm()
            //     }else if(response.data.msg === 'fail'){
            //         alert("Oops, something went wrong. Try again")
            //     }
            // })
            fetch('/customer/profile', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
        
                data: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    messageHtml: this.messageHtml
                })
                
              }).then((response) => response.json()).then(data => console.log(data)); 
              console.log("hi");
            //  }).then((response)=>{
            //     if (response.data.msg === 'success'){
            //         alert("Email sent, awesome!"); 
            //         this.resetForm()
            //     }else if(response.data.msg === 'fail'){
            //         alert("Oops, something went wrong. Try again")
            //     }
            // })           
    }
}        