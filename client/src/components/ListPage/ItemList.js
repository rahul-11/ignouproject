import React from 'react';
import {connect} from 'react-redux'
import {deleteItem} from '../../actions';

import './ItemList.css';

class ItemList extends React.Component{
  
  renderItem = (item)=>{
    return(
      <div className="ui stacked segment" key={item._id}>
        <div className="card">
          <div className="item_name">
            <h4>{item.name}</h4>
          </div>
          <div className="detail">
            <div className="created_on">
              <h5>Added on: {item.addedOn.split('T')[0]}</h5>
            </div>  
            <div className="tabs">
              <a className="ui button primary small" href={item.url} >
                 Checkout
              </a>
              <button
                className="ui button red"
                onClick={() => this.props.onDeleteItem(item._id)}
              >
                <i className="ui trash alternate outline icon"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div> 
    )
  }
  
  renderItemList = ()=>{
    if(!this.props.items){
      return (
        <div className="ui placeholder segment">
          <div className="ui icon header">
            <i className="ui edit outline"></i>
            Add Items to the List
          </div>
        </div>
      );
    }
    else{
      return this.props.items.map(item =>{
        return this.renderItem(item);
      })
    } 
  }
  
  
  render(){
    return(
      <div style={{marginTop: "20px"}}>
        <div className="">
          <div className="ui items">
            {this.renderItemList()}
          </div>
        </div>
      </div>
    );
  };
}

export default connect(null, {deleteItem})(ItemList);