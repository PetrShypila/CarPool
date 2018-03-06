import './styles/custom_styles.css';

import React from 'react';
import {Provider} from 'react-redux';
import {render} from "react-dom";
import {BrowserRouter} from 'react-router-dom';

import App from './components/App';
import configureStore from './store/configureStore';

const store = configureStore();

render((
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
), document.getElementById('app'));
