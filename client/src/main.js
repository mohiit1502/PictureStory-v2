import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import * as serviceWorker from './serviceWorker';
import Router from './app/router';
import reducer from './app/reducer'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(<Router store={store} />, document.getElementById('root'));

serviceWorker.unregister();
