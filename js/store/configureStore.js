/* @flow */

'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
var { AsyncStorage } = require('react-native');
import { persistStore, autoRehydrate } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

function configureStore(onComplete: ?()=>void) {

  const deviceSubsetFilter = createFilter(
    'devices',
    ['activeDevice'],
  )

  const navigationSubsetFilter = createFilter(
    'navigation',
    null
  )

  let store = compose(
    autoRehydrate(),
    applyMiddleware(thunk),
  )(createStore)(reducers);

  persistStore(store, {
    storage: AsyncStorage,
    transforms: [
      deviceSubsetFilter,
      navigationSubsetFilter,
    ]
  }, (err, rehydrateState) =>{
    onComplete();
    console.log('rehydrateState', rehydrateState);
    console.log('state after', store.getState());
    if(store.getState().devices.activeDevice){
      // BleManager.connect();
    }
  });

  if(isDebuggingInChrome){
      window.store = store;
      window.safelyClearStorage = () => AsyncStorage.clear();
  }
  return store;
}

module.exports = configureStore;
