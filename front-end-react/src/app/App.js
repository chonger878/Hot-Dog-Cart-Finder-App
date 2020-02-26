import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Map from '../components/map/MapContainer';
import Carts from '../components/carts/Carts';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: []};
  }

  componentWillMount() { // we can add a handler instead of this biuld in function
    axios("http://localhost:9000/carts").then(res => this.setState({apiResponse: res.data}));
 }

  render() {
    return (
      <div className="App" style={{height: '100%'}}>
        <Header />
        <div className="App-content">
          <Map />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;