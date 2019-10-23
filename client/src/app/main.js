import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
// import * as serviceWorker from '../serviceWorker';
import Router from './router';
import reducer from './reducer'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(<Router store={store} />, document.getElementById('root'));

// serviceWorker.unregister();
