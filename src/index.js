'use strict';
import './styles/styles.css';
import 'babel-polyfill';

import React from 'react';
import {Provider} from 'react-redux';
import * as ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';

import App from './components/App';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
), document.getElementById('app'));
