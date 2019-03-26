import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import reducers from './reducers';
import history from './history';

import Landing from './components/Landing/Landing';
import UserPage from './components/UserPage/UserPage';
import ListPage from './components/ListPage/ListPage';
import App from './components/App';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose; 
const store = createStore( 
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/user" exact component={UserPage} />
          <Route path="/user/list/:list_id" exact component={ListPage} />
        </Switch>
      </App>
    </Router>
  </Provider>, 
  document.querySelector('#root')
);