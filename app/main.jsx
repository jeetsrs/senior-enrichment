'use strict';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
// import Root from './components/Root';
import View from './components/View';

render (
  <Provider store={store}>
    {/* <Root/> */}
    <View/>
  </Provider>,
  document.getElementById('main')
);
