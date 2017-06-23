import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';

import './sass/style.scss';
import Router from './Router';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, createLogger())(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
  <Router/>
</Provider>, document.querySelector('#app'));
