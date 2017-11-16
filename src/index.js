'use strict';
import './styles/styles.css';
import 'babel-polyfill';

import React from 'react';
import {Provider} from 'react-redux';
import * as ReactDOM from "react-dom";
import {Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import App from './components/App';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render((
  <Router history={createHistory()} >
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>
), document.getElementById('app'));
