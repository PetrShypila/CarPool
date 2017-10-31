import './styles/styles.css';

import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import App from './components/App';
import * as ReactDOM from "react-dom";

ReactDOM.render((<App/>), document.getElementById('app'));
