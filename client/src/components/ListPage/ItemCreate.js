import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {addItem} from '../../actions';

class ItemCreate extends React.Component{
  renderInput =({input, placeholder})=>{
    return(
      <div className="six wide field">
        <input type="text" {...input} placeholder={placeholder} />
      </div>
    )
  }

  render(){
    return(
      <div  id="create_item_form" className="ui  stacked segment"> 
        <h3 id="add_item_header" className="header">Add Item</h3>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSubmit)}
          className="ui form"
        >
          <div className="item_form">
            <div id="item_form_fields" className="fields" >
              <Field name="item_name" component={this.renderInput} placeholder="Item Name" />
              <Field name="item_url" component={this.renderInput} placeholder=" Item URL" />
            </div>
            <button id="item_btn" className="ui  labeled icon button positive" >
              <i className="check icon"></i>
              Add Item
            </button>
          </div>
        </form>
      </div>
    );
  };
}

const itemCreate = reduxForm({
  form: 'createItemForm'
})(ItemCreate);

export default connect(null, {addItem})(itemCreate);