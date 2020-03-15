import React, {Component} from 'react';
import './Order.css'
import _ from 'lodash'

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
			order: [],
    };
  }

  componentDidMount() {
		fetch("/userOrder").then(res => res.json()).then(order => {
			if (order.length > 0) {
				this.setState({
					order
				})
			}
		});
  }

  renderTableData() {
    return this.state.order.map((order, index) => {
       const {id, Status, CartId, CustomerId, OrderDate, Items} = order

       return (
          <tr key={index}>
            <td>{id}</td>
            <td>{Status}</td>
            <td>{CartId}</td>
            <td>{CustomerId}</td>
            <td>{OrderDate}</td>
            <td>{Items}</td>
          </tr>
       )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.state.order[0])

    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
  }

render() {
    return (
			<table className="orders-table" id='orders'>
				{this.state.order.length > 0 ? 
					<tbody className="order-body">
						<tr>{this.renderTableHeader()}</tr>
						{this.renderTableData()}
					</tbody> 
					:
					<tbody>
						<tr></tr>
					</tbody>
				}
			</table>
    )
  }
}

export default Order;