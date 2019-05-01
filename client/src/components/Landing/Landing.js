import React from 'react';
import Login from './Login';
import Signup from './Signup';
import ProductDisplay from './ProductsDisplay';
import './Landing.css';

class Landing extends React.Component{
  state = {active_menu: 'sign_up'};

  renderFormComponent = ()=>{
    const {active_menu} = this.state;
    if(active_menu === 'sign_up'){
      return <Signup />
    }
    else if(active_menu === 'login'){
      return <Login />
    }
  }

  render(){
    
    return(
      <div>
        <div className="landing_page">
          <div className="landing_form">
            <div className="ui segment raised">
              <div className="ui tabular menu">
                <div
                  className="header item"
                  onClick={()=> this.setState({active_menu: 'sign_up'})} 
                >
                  Signup
                </div>
                <div
                  className=" header item" 
                  onClick={()=> this.setState({active_menu: 'login'})}
                >
                  Login
                </div>
              </div>
              {this.renderFormComponent()}
            </div>
          </div>
        </div>
        <ProductDisplay/>
      </div>
    )
  }
}

export default Landing;