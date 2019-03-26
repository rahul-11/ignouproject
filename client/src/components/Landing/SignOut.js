import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../actions';
import history from '../../history';

class SignOut extends React.Component{
  onSignout =()=>{
    this.props.signOut(()=>{
      history.push("/")
    });
  }

  render(){
    return(
        <div style={{cursor: "pointer"}} onClick={this.onSignout}>
          Log out
        </div>
    );
  };
}

export default connect(null, {signOut})(SignOut);
