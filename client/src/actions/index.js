import axios from 'axios';
import * as type from './types';
import keys from './keys';

const baseUrl = keys.baseUrl;

export const isSignedIn = ()=> async dispatch =>{
  const token = localStorage.getItem('token');
  dispatch({type: type.ISSIGNEDIN, payload: token});
}

export const signIn = (data, callback) => async (dispatch) =>{
  const {login_email: email, login_password: password} = data; 

  try{
    const res = await axios.post(`${baseUrl}/signin`, {email, password});

    localStorage.setItem('token', res.data.token);
    dispatch({ type: type.SIGN_IN, payload: res.data});
    callback();
  }
  catch(err){
    dispatch({type: type.SIGN_IN_ERROR});
  }
};

export const signUp = (data, callback) => async (dispatch) =>{
  try{
    const res = await axios.post(`${baseUrl}/signup`, data);

    localStorage.setItem('token', res.data.token);
    dispatch({type: type.SIGN_UP, payload: res.data}); 
    callback();
  }
  catch(e){
    dispatch({type: type.SIGN_UP_ERROR});
  } 
};

export const signOut = (callback) => async (dispatch)=>{
  localStorage.removeItem('token');
  dispatch({type: type.SIGN_OUT});
  callback();
};

export const userLists = () => async dispatch =>{
  const token = localStorage.getItem('token');
  try{
    const res = await axios.get(`${baseUrl}/user/lists`, {headers: {'authorization': token}});
    dispatch({type: type.USER_LISTS, payload: res.data});
  }
  catch(err){
    dispatch({type: type.NETWORK_ERROR});
  }
};

export const createList = (data) => async dispatch=>{
  const token = localStorage.getItem('token');
  try{
    const res = await axios.post(`${baseUrl}/list/new`, data,{headers: {'authorization': token}});
    if(res.status === 400){
      dispatch({type: type.CREATE_LIST_ERROR});
    }

    dispatch({type: type.CREATE_LIST, payload: res.data});
  }
  catch(e){
    dispatch({type: type.NETWORK_ERROR});
  }
};

export const deleteList = (list_id, callback) => async dispatch =>{
  const token = localStorage.getItem('token');
  try{
    const res = await axios.delete(`${baseUrl}/list/${list_id}`, {headers: {'authorization': token}});

    if(res.status !== 200){
      dispatch({type: type.DELETE_LIST_ERROR});
    }
    dispatch({type: type.DELETE_LIST, payload: list_id});
    callback();
  }
  catch(err){
    dispatch({type: type.NETWORK_ERROR});
  }
};

export const fetchList = (list_id) => async dispatch =>{
  const token = localStorage.getItem('token');
  try{
    const res = await axios.get(`${baseUrl}/list/${list_id}`, {headers: {'authorization': token}});

    if(!res.data._id){
      dispatch({type: type.FETCH_LIST_ERROR});
    }
    dispatch({type: type.FETCH_LIST, payload: res.data});
  }
  catch(err){
    dispatch({type: type.NETWORK_ERROR});
  }
};



export const addItem = (data, list_id) => async dispatch =>{
  const token = localStorage.getItem('token');

  try{
    const {item_name, item_url} = data;
    const res = await axios.post(
      `${baseUrl}/list/${list_id}/new`,
      {name: item_name, url: item_url}, {headers: {'authorization': token}}
    );
    if(res.status === 422 || res.status === 400){
      dispatch({type: type.ADD_ITEM_ERROR});
    }
    dispatch({type: type.ADD_ITEM, payload: {list_id , data: res.data}});
  }
  catch(err){
    dispatch({type: type.NETWORK_ERROR});
  }
};

export const deleteItem = (list_id, item_id)=> async dispatch =>{
  const token = localStorage.getItem('token');
  // try{
    const res = await axios.delete(
    `${baseUrl}/list/${list_id}/item`, 
    {headers: {'authorization': token}, data: {'itemId': item_id}}
    );
    
    if(res.status !== 200){
      dispatch({type: type.DELETE_ITEM_ERROR});
    };
    dispatch({type: type.DELETE_ITEM, payload: {list_id, data: res.data}});
  // }
  // catch(err){
  //   dispatch({type: type.NETWORK_ERROR});
  // };
}