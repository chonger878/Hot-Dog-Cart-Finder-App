import React, {Component} from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
          menu: []
        };
      }
     
      componentDidMount() {

      }

    render () {
        return (
            <div className="cart-menu">
                <h3>Menu</h3>
            </div>
        );
    }  

}

export default Menu;