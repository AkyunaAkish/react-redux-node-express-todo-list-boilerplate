import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// uncomment if implementing socket.io import io from 'socket.io-client'; const
// HOST = NODE_ENV === 'development' ? 'http://localhost:3000' :
// window.location.origin; const socket = io.connect(HOST);

import 'bootstrap-loader';
import './sass/style.scss';
import Router from './Router';
import reducers from './reducers';

const dev = NODE_ENV === 'development';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// create store and enable redux chrome extension
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={ getMuiTheme(darkBaseTheme) }>
      <Router/>
    </MuiThemeProvider>
  </Provider>, document.querySelector('#app'));
