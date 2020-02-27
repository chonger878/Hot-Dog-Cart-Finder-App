import React, {Component} from 'react';
import axios from 'axios';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import SignIn from './components/signin/SignIn';
import Map from './components/map/Map';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: [],
      DataFromChild: false
    };
    
  }
  myCallback = (isCorrectSignIn) => {// when the callback sent to SignIn is altered, it is now usable in the App
    this.setState({ DataFromChild: isCorrectSignIn});
  }
  componentWillMount() { // we can add a handler instead of this biuld in function
    axios("http://localhost:9000/signin").then(res => this.setState({apiResponse: res.data}));
 }

  render() {
    return (
      <div className="App" style={{height: '100%'}}>
        <Header />
        <div className="App-content">
           
          {this.state.apiResponse.map(resource => (
            <div>
            Email: {resource.Email} Password: {resource.Password}
            <SignIn callbackFromParent={this.myCallback} user={resource.Email} pass={resource.Password}/> 
            </div>
          ))}
          <Map show = {this.state.DataFromChild} />
          
        </div>
        <Footer />
      </div>
    );
  }

}

export default App;
