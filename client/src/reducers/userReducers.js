import * as type from '../actions/types';

const INITIAL_STATE = {
  userLists: null
}

export default (state=INITIAL_STATE, action)=>{
 switch(action.type){
  case type.USER_LISTS: 
    return {...state, userLists: action.payload};

  case type.CREATE_LIST:
    return {...state, userLists: state.userLists.concat(action.payload) };
  
  case type.CREATE_LIST_ERROR:
    return {...state, create_list_error: "Cannot create list"};

  case type.DELETE_LIST:
    return {...state, userLists: state.userLists.filter(list => list._id !== action.payload)}

  default:
    return state
 }
}