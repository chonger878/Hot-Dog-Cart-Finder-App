import React from 'react';
//import  './InventoryInfo.css';

class InventoryLog extends React.component {
    constructor(props){
        super(props);
        this.state = {
            vendor: null,
            SKU: null,
            DESC: null,
            Qty: null
        };
    }

        handleSubmit(e){
            e.preventDefault();
            var record = this;
            this.setState({
                vendor: record.refs.vendor,
                SKU: record.refs.SKU,
                DESC: record.refs.Description,
                Qty: record.refs.Quantity });
        

        fetch('/inventory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vendor: record.refs.vendor.value,
                SKU: record.refs.SKU.value,
                DESC: record.refs.Description.value,
                Qty: record.refs.Quantity.value
                
            })
        }).then(response => response.json()).then(body => console.log(body));
    }

    render(){
        <div className = "InventoryLog">
            <form name = "InventoryInfo">
                <label for = "SKU">SKU</label>
                <input text= "text" ref="SKU" id= "inventory-SKU" />
                <label for = "DESC">DESC</label>
                <input text= "text" ref="Description" id= "inventory-DESC" />
                <label for = "Qty">Qty</label>
                <input text= "text" ref="Quantity" id= "inventory-Qty" />
            </form>
        </div>
    }

} export default InventoryLog;