import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducers from './authReducers';
import userReducers from './userReducers';
import listReducers from './listReducers';

export default combineReducers({
  form: formReducer,
  auth: authReducers,
  user: userReducers,
  lists: listReducers
});