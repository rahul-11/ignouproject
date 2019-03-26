import React from 'react';
import {connect} from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends React.Component{

    componentDidMount(){
      this.shouldNavigateAway();
    }

    componentDidUpdate(){
      this.shouldNavigateAway();
    }

    shouldNavigateAway(){
      if(!this.props.signedIn){
        this.props.history.push('/');
      }
    }

    render(){
      return <ChildComponent {...this.props} />
    }

  }

  function mapStateToProps(state){
    return {signedIn: state.auth.isSignedIn}
  }

  return connect(mapStateToProps)(ComposedComponent);
};

