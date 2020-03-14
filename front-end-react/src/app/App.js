import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from '../components/header/Header';
import Map from '../components/map/MapContainer';
import Nav from '../components/nav/Nav';
import About from '../components/about/About';
import Contact from '../components/contact/Contact';
import Carts from '../components/carts/Carts';
import Customers from '../components/customers/Customers';
import Orders from '../components/orders/Orders';
import Help from '../components/help/Help';
import Cart from '../components/cart/Cart';
import SignIn from '../components/signin/SignIn';
import SignUp from '../components/signup/SignUp';
import _ from 'lodash';


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'home',
      user: ''
    }

    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    this.setState({
      page: _.split(_.split(_.split(window.location.href, '/', 4), '?'), ',')[3],
    })
  }

  setUser(user) {
    this.setState({user});
  }

  render() {
    var text;
    var {user} = this.state;

    return (
      <Router>
        <div className="App" style={{height: '100%'}}>
          <Header />
          <div className="App-content">
            <Nav type={this.state.page} user={user}/>
            <Switch>
              <Route path="/(Home|admin/Home|customer/Home|vendor/home)" exact component={Home}/>
              <Route path="/(about|admin/about|customer/about|vendor/about)" component={About}/>
              <Route path="/(Contact|admin/Contact|customer/contact|vendor/contact)" component={Contact}/>
              <Route path="/(carts|admin/carts|customer/carts)" exact component={Carts}/>
              <Route path="/(customers|admin/customers|customer/customers)" exact component={Customers}/>
              <Route path="/(orders|admin/orders|customer/orders)" exact component={Orders}/>
              <Route path="/(carts/:id|admin/carts/:id|customer/carts/:id)" component={Cart}/>
              <Route path="/(help|admin/help|customer/help|vendor/help)" component={Help}/>
              <Route path="/(map|admin/map|customer/map|vendor/map)" component={Map}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/signin" render={(props) => (<SignIn {...props} user={this.setUser}/>)}/>
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