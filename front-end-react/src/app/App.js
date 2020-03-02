import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from '../components/header/Header';
import Map from '../components/map/MapContainer';
import Nav from '../components/nav/Nav';
import About from '../components/about/About';
import Contact from '../components/contact/Contact';
import Carts from '../components/carts/Carts';
import Cart from '../components/cart/Cart';

import './App.css';

class App extends Component {
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
              <Route path="/map" component={Map}/>
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