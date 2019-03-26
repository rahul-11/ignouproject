import {FETCH_LIST, DELETE_ITEM, ADD_ITEM} from '../actions/types';

const INITIAL_STATE = {
  fetchedLists: null
};

export default (state=INITIAL_STATE, action) =>{
  switch(action.type){
    case FETCH_LIST:
      return {...state, [action.payload._id]: action.payload };
    
    case ADD_ITEM:
      const {list_id, data} = action.payload;
      return { ...state, [list_id]: data };

    case DELETE_ITEM:
      return {...state, [action.payload.list_id]: action.payload.data };

    default:
      return state;
  }
}