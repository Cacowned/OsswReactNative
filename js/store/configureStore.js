/* @flow */

'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
var { AsyncStorage } = require('react-native');

import {
  getDevice,
  getWatchSets,
  getSettings,
} from '../store/storageManager';

import {
  rehydrateDevice,
  rehydrateWatchSets,
  rehydrateSettings,
} from '../actions';

import BleManager from '../Ble/BleManager';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export function clearStorage(){
  AsyncStorage.clear();
}

function configureStore(onComplete: ?()=>void) {
  let store = createStore(reducers, applyMiddleware(thunk));

  var settings = getSettings().then((data)=>{
    if(data && data.settings){
      console.log('restoring from storage:', data.settings);
      store.dispatch(rehydrateSettings(data.settings));
    }
  });

  var watchsets = getWatchSets().then((data)=>{
    if(data && data.length > 0){
      console.log('restoring from storage:', data);
      store.dispatch(rehydrateWatchSets(data));
    }
  });

  var devices = getDevice()
    .then((data)=>{
      if(data && data.device){
        var device = data.device;
        console.log('restoring from storage:', device);
        store.dispatch(rehydrateDevice(device));
      }
    });

  Promise.all([settings, watchsets, devices])
    .then(value => {
      if(onComplete){
        onComplete();
      }
    });

  if(isDebuggingInChrome){
      window.store = store;
      window.safelyClearStorage = clearStorage;
  }
  return store;
}

export default configureStore;
