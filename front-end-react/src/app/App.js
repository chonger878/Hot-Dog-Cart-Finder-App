import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from '../components/header/Header';
import Map from '../components/map/MapContainer';
import Nav from '../components/nav/Nav';
import About from '../components/about/About';
import Contact from '../components/contact/Contact';
import Carts from '../components/carts/Carts';
import Help from '../components/help/Help';
import Cart from '../components/cart/Cart';
import SignIn from '../components/signin/SignIn';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {//apiResponse: [],
      DataFromChild: null
    };
  }
  myCallback = (signedInId) => {// when the callback sent to SignIn is altered, it is now usable in the App
    this.setState({ DataFromChild: signedInId});
  }
  // componentWillMount() { // we can add a handler instead of this biuld in function
  //   axios("http://localhost:9000/signin").then(res => this.setState({apiResponse: res.data}));
  // }
  render() {
    return (
      <Router>
        <div className="App" style={{height: '100%'}}>
          <Header />
          <div className="App-content">
            <Nav />
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/carts" exact component={Carts}/>
              <Route path="/carts/:id" component={Cart}/>
              <Route path="/help" component={Help}/>
              <Route path="/map" component={Map}/>
              <Route path="/signin" component={SignIn}/>{/*render={SignIn, callbackFromParent = this.myCallback}/>*/}            
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const Home = () => (
  <div className="home">
  </div>
);

export default App;