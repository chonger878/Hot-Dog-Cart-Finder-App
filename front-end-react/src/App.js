import React, {Component} from 'react';
import axios from 'axios';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
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
      <div className="App" style={{height: '100%'}}>
        <Header />
        <div className="App-content">
          {this.state.apiResponse.map(resource => (
            <p>First Name: {resource.FirstName} Last Name: {resource.FirstName} Phone: {resource.FirstName}</p>
          ))}
        </div>
        <Footer />
      </div>
    );
  }

}

export default App;
