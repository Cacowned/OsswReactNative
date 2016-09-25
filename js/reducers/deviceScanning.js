/* @flow */
'use strict';

import {
  STOP_SCANNING, START_SCANNING,
  SELECT_DEVICE, DEVICE_FOUND
} from '../actions/deviceScanning'

import type {Action} from '../actions/types';

var { combineReducers } = require('redux');

export type Device = {
  deviceId: string;
  name: string;
  address: string;
  state: string;
  rssi: string;
}

type State = {
  device: Device;
  isScanning: boolean;
}

const initialState: State = {device: null, isScanning: false};

const isScanning = (state = initialState.isScanning, action) => {
  switch(action.type){
    case STOP_SCANNING:
      return false;
    case START_SCANNING:
      return true;
    default:
      return state;
  }
};

// function device(state: Device = initialState.device, action: Action): State {
//   switch(action.type){
//     case SELECT_DEVICE:
//       return {...state, device: action.device};
//     case DEVICE_FOUND:
//       return {...state, device: action.device};
//     default:
//       return state;
//   }
// }

// const rootReducer = combineReducers({
//   shouldScan,
//   device,
// });
// module.exports=rootReducer;

const devices = (state, action) => {
  switch(action.type){
    case SELECT_DEVICE:
      return{
        ...state,
        selected: true,
      }
    default:
      return state;
  }
};

const byId = (state={}, action) => {
  switch(action.type){
    case DEVICE_FOUND:
      return {
        ...state,
        [action.device.deviceId]: action.device,
      }
    default:
      const {device} = action;
      if(device){
        return {
          ...state,
          [device.deviceId]: devices(state[device.deviceId], action),
        };
      }
      return state;
  }
};

const foundDevices = (state = [], action) => {
  switch(action.type){
    case DEVICE_FOUND:
      if(state.indexOf(action.device.deviceId) === -1){
        return state.concat(action.device.deviceId);
      }
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  foundDevices,
  isScanning,
});

export const getDevice = (state, id) => state.byId[id];

export const getFoundDevices = state =>
  state.foundDevices.map(id => getDevice(state, id));
