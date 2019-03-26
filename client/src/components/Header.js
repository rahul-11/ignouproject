import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {isSignedIn} from '../actions';
import SignOut from './Landing/SignOut';
import './Header.css';

class Header extends React.Component{
  componentDidMount(){
    this.props.isSignedIn();
  }

  renderHeaderTabs = ()=>{
    const {signedIn} = this.props;
    if(signedIn === true){
      return(
        <div className="right_nav">
          <div className="header-buttons">
            <Link className="" to="/user">All Lists</Link>
          </div> 
          <div className="header-buttons">
            <SignOut />
          </div>
        </div>
      )
    }
  }

  render(){
    return(
      // <div className="ui secondary pointing menu">
        <div className="navbar">
          <div className="brand_logo">
            <Link className="item" to="/">Brand</Link>
          </div>
          {this.renderHeaderTabs()}
        </div>
    );
  };
}

const mapStateToProps = (state)=>{
  return {signedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {isSignedIn})(Header);