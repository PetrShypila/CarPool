import './styles/styles.css';

import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

import App from './components/App';
import * as ReactDOM from "react-dom";
import {loadMarkers} from "./actions/markerActions";

const store = configureStore();
store.dispatch(loadMarkers());

ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('app'));
