/* @flow */

'use strict';

import {createStore} from 'redux';

var reducers = require('../reducers');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

function configureStore(onComplete: ?()=>void){
  const store = createStore(reducers);

  onComplete();

  if(isDebuggingInChrome){
      window.store = store;
  }
  return store;
}

module.exports = configureStore;
