import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {signUp} from '../../actions';
import history from '../../history';

class Signup extends React.Component{
  renderError({error,touched, active}){
    if(touched && error && !active){
      return(
        <div className="ui pointing label">
          <div className="header">{error}</div>
        </div>
      );
    };
  }

  renderSignUpError = ()=>{
    if(this.props.signUpError){
      return(
        <div className="ui red basic label">
          Email Address already registered!
        </div>
  
      )
    }
    
  }

  renderInput = ({input, label, meta, placeholder, type}) =>{
    return(
      <div className="field">
        <label>{label}</label>
        <input {...input} type={type} placeholder={placeholder}/>
        {this.renderError(meta)}
      </div>
    );
  };

  renderCheckBox =({input, meta})=>{
    return(
      <div className="ui checkbox">
        <input type="checkbox"  {...input} />
        <label>I agree to the terms and conditions</label>
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) =>{
    this.props.signUp(formValues, ()=>{
      history.push("/user");
    });
  }

  render(){
    return(
      <div style={{margin:"10px"}}>
        <form
          className="ui form fluid"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          {this.renderSignUpError()}
          <div className="fields">
            <Field name="first_name" type="text" component={this.renderInput} label="First Name" placeholder="First Name" />
            <Field name="last_name" type="text" component={this.renderInput} label="Last Name" placeholder="Last Name" />
          </div>
          <Field name="email" type="text" component={this.renderInput} label="Email" placeholder="user@example.com" />
          <Field name="password" type="password" component={this.renderInput} label="Create Password" placeholder="Password" />
          <Field name="confirm_password" type="password" component={this.renderInput} label="Confirm Password" placeholder="Password" />
          <Field name="terms_checkbox" component={this.renderCheckBox} />
          <button 
            className="ui button green fluid" 
            style={{marginTop: "5px"}}
          >
            Sign up
          </button>
        </form>
      </div>
    );
  };
}

const validate = (formValues)=>{
  const errors = {};
  const {first_name, last_name, email, password, confirm_password, terms_checkbox } = formValues;
  if(!first_name) errors.first_name = "First Name is required";
  else if(first_name.length <= 2) errors.first_name = "First Name too short";

  if(!last_name) errors.last_name = "Last Name is required";
  else if(last_name.length <= 2) errors.last_name = "Last Name too short";

  if(!email){
    errors.email = "Email address is required";
  }
  else if(email.indexOf("@") === -1 || email.indexOf(".com") === -1){
    errors.email = "Please enter valid email address";
  }

  if(!password){
    errors.password= "Please provide your Password.";
  }
  else if(password.length <= 5) errors.password = "Your Password should be atleast six character long";

  if(!confirm_password){
    errors.confirm_password= "Please confirm your Password.";
  }
  else if( password && password.localeCompare(confirm_password)) errors.confirm_password = "Your Password does not match";

  if(!terms_checkbox) errors.terms_checkbox = "Please read and agree to terms and conditions to continue";

  return errors;
}

const SignUpForm = reduxForm({
  form: 'signupForm',
  validate: validate
})(Signup);

const mapStateToProps =(state)=>{
  return {signUpError: state.auth.signUpError};
}

export default connect(mapStateToProps, {signUp})(SignUpForm);

