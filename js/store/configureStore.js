/* @flow */

'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

function configureStore(onComplete: ?()=>void){
  const store = createStore(reducers, applyMiddleware(thunk));

  setTimeout(onComplete, 10);

  if(isDebuggingInChrome){
      window.store = store;
  }
  return store;
}

module.exports = configureStore;
