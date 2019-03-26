import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {userLists} from '../../actions';

import './ShowLists.css';

class ShowLists extends React.Component{
  componentDidMount(){
    this.props.userLists();
  };

  renderLists = ()=>{
    if(this.props.lists){
      return this.props.lists.map(list =>{
        return(
          <div className="ui stacked segment" key={list._id}>
            <div className="card">
              <div className="list-name">
                <Link  
                  to={`/user/list/${list._id}`} 
                >
                  <h4>{list.name}</h4>
                </Link>
              </div>
              <div className="details">
                <h5>Created on: {list.createdOn.split('T')[0]}</h5>
                <div className="ui yellow label">
                  Collection of 
                  <div className="detail">{list.items.length}</div>
                </div>
              </div>
            </div> 
          </div>
        );
      });
    }
    else{
      return <div>Loading</div>
    }
    
  };

  renderSegment = ()=>{
    if(!this.props.lists){
      return(
        <div className="ui placeholder segment">
          <div className="ui icon header">
            <i className="clipboard outline icon"></i>
            Create New Lists
          </div>
        </div>
      )
    }
    else{
      return(
        <div>
          <div style={{marginTop: "30px"}}>
            <h1>Your Lists </h1>
          </div>
          <div className="ui middle aligned selection list">
            {this.renderLists()}
          </div>
        </div>
      ) 
    }
  }

  render(){
    return(
      <div className="ui container">
          {this.renderSegment()}
      </div>
    );
  };

}

const mapStateToProps = (state) =>{
  return { lists : state.user.userLists }
}

export default connect(mapStateToProps, {userLists})(ShowLists);