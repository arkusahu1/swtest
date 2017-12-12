import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import App from './components/app';
import Login from './components/login/Login';
import Home from './components/home/Home';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
