'use strict';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import View from './components/View';

render (
  <Provider store={store}>
    <View campusList={store.campus}/>
  </Provider>,
  document.getElementById('main')
);
