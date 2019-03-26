import React from 'react';
import {connect} from 'react-redux'
import ItemList from './ItemList';
import ItemCreate from './ItemCreate';
import {fetchList, deleteList, addItem, deleteItem} from '../../actions';
import history from '../../history';
import requireAuth from '../requireAuth';

import './ListPage.css';

class ListPage extends React.Component{
  componentDidMount(){
    const listId = this.props.location.pathname.split('/')[3];
    this.props.fetchList(listId);
  }

  onCreateItem = (formValues)=>{
    const listId = this.props.location.pathname.split('/')[3];
    this.props.addItem(formValues, listId);
  }

  onDeleteItem = (item_id) =>{
    const listId = this.props.location.pathname.split('/')[3];
    this.props.deleteItem(listId, item_id);
  }

  onDelete = (list_id) =>{
    this.props.deleteList(list_id, ()=>{
      history.push("/user")
    })
  }

  renderListInfo = ()=>{
    const {list} = this.props;

    if(list){
      return (
        <div id="list-info"  className="ui raised segment">
          <h2 className="list_name">{list.name}</h2>
          <div className="list_info">
            <h3 className="sub header" >Created on:  {list.createdOn.split('T')[0]}</h3>
            <h3 className="sub header" >Collection: {list.items.length}</h3>
          </div>  
          <button
            id="create_item_btn"
            className="ui button red labeled icon"
            onClick={() => this.onDelete(list._id)}
          >
            <i className="ui trash alternate outline icon"></i>
            Delete
          </button>
        </div>
      );
    }
  };

  renderItemList = ()=>{
    const {list} = this.props;
    if(list){
      return(
        <ItemList items={list.items}  onDeleteItem={this.onDeleteItem}/>
      )
    }
    return <h2>Loading</h2>
  }

  render(){
    return(
      <div>
        <div className="ui container">
          <div>
            {this.renderListInfo()}
          </div>
          <ItemCreate onSubmit={this.onCreateItem} />
          {this.renderItemList()}
        </div>
        
      </div>
    );
  };
}

const mapStateToProps =(state, ownProps)=>{
  const listId = ownProps.location.pathname.split('/')[3];
  const list = state.lists[listId];
  return {list};
  
}

export default connect(mapStateToProps, {fetchList, addItem, deleteItem, deleteList})(requireAuth(ListPage));