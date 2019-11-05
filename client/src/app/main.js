import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import {createStore, applyMiddleware, compose} from 'redux'
// import * as serviceWorker from '../serviceWorker';
import Router from './router';
import reducer from './reducer'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: { // prettier-ignore
            immutable: Immutable
        }
    }) : compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(<Router store={store} />, document.getElementById('root'));

// serviceWorker.unregister();
