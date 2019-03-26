import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {createList} from '../../actions';
import './CreateList.css';

class CreateList extends React.Component{
  renderInput = ({input, placeholder, meta}) =>{
    return(
      <div>
        <input type="text" {...input} placeholder={placeholder} />
      </div>
    )
  }

  onSubmit = (formValues) =>{
    if(formValues.list_name === ""){
      this.renderError("Provide List a name")
    }
    else{
      this.props.createList(formValues);
    }
  }

  render(){
    return(
      <div className="ui container">
        <div className="ui raised segment">
          <form
            className="ui form"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <div className="create-list">
              <div className="ui header">
                <i className="clipboard outline icon"></i>
              </div>
              <div className="ui input">
                <Field name="list_name" component={this.renderInput} placeholder="List Name" />
                <button id="add-btn" className="ui button primary">Add List</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
}


const createListForm = reduxForm({
  form: 'createListForm'
})(CreateList)

export default connect(null, {createList})(createListForm);