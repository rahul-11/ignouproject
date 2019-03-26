import React from 'react';
import CreateList from './CreateList';
import ShowLists from './ShowLists';
import requireAuth from '../requireAuth';

class UserPage extends React.Component{
  render(){
    return(
      <div>
        <CreateList/>
        <ShowLists />
      </div>
    )
  }
}


export default requireAuth(UserPage);