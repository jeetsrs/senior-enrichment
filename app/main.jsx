'use strict';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from './store';
import MainBody from './components/MainBody';
import history from './history';

render (
  <Provider store={store}>
    <Router history={history}>
      <MainBody />
    </Router>
  </Provider>,
  document.getElementById('main')
);
