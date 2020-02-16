import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: []};
  }

  componentWillMount() { // we can add a handler instead of this biuld in function
    axios("http://localhost:9000/users").then(res => this.setState({apiResponse: res.data}));
 }

  render() {
    return (
      <div className="App">
        <div className="App-resource">
          {this.state.apiResponse.map(resource => (
            <p>First Name: {resource.FirstName} Last Name: {resource.FirstName} Phone: {resource.FirstName}</p>
          ))}
        </div>
      </div>
    );
  }

}

export default App;
