import * as type from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  signInError: false
};

export default (state = INITIAL_STATE, action)=>{
  switch(action.type){
    case type.ISSIGNEDIN:
      if(action.payload === null){
        return {...state, isSignedIn: false};
      }else return {...state, isSignedIn: true};
      
    case type.SIGN_UP:
      return {...state, isSignedIn: true };
    
    case type.SIGN_IN:
      return { ...state, isSignedIn: true };
    
    case type.SIGN_OUT:
      return {...state, isSignedIn: false};

    case type.SIGN_IN_ERROR:
      return{...state, signInError: true};

    case type.SIGN_UP_ERROR:
      return {...state, signUpError: true};
    default:
      return state;
  }
}