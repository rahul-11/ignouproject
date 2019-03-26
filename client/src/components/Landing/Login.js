import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {signIn} from '../../actions';
import history from '../../history';

class Login extends React.Component{
  renderError({error,touched}){
    if(touched && error){
      return(
        <div className="ui pointing label">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderLoginError = ()=>{
    if(this.props.signInError){
      return(
        <div className="ui red basic label">
          Email Address or Password is wrong!
        </div>
      )
    }
  }

  renderInput = ({input, label, meta, placeholder, type}) =>{
    return(
      <div className="form-field" style={{margin:"5px"}}>
        <label>{label}</label>
        <input {...input} type={type} placeholder={placeholder} />
        {this.renderError(meta)}
      </div>
    )
  };
  
  onSubmit = (formValues)=>{
    const {login_email, login_password} = formValues;
    this.props.signIn({login_email, login_password}, () => {
      history.push("/user");
    });
  }

  render(){
    return(
      <div className="login_form">
        <form
          className="ui form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          {this.renderLoginError()}
          <Field name="login_email" type="text" component={this.renderInput} label="Email" placeholder="Your Email" />
          <Field name="login_password" type="password" component={this.renderInput} label="Password" placeholder="Your Password" />
          <button 
            style={{marginRight:"5px"}}
            className="ui button primary fluid"
          >
            Login
          </button>
        </form>
      </div>
    );
  };
}

const validate = (formValues) =>{
  const errors = {};
  const {login_email, login_password} = formValues;

  if(!login_email){
    errors.login_email = "Please provide your Email";
  }
  else if(login_email.indexOf("@") === -1 || login_email.indexOf(".com") === -1){
    errors.login_email = "Please enter valid email address"
  }

  if(!login_password){
    errors.login_password= "Please provide your Password."
  }
  return errors;
}

const loginForm = reduxForm({
  form: 'loginForm',
  validate: validate
})(Login);

const mapStateToProps = (state)=>{
  return {signInError: state.auth.signInError}; 
}

export default connect(mapStateToProps, {signIn})(loginForm);