/* @flow */
'use strict';

import {
  STOP_SCANNING, START_SCANNING,
  SELECT_DEVICE, DEVICE_FOUND
} from '../actions/deviceScanning'

import type {Action} from '../actions/types';

var { combineReducers } = require('redux');

export type Device = {
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

const activeDevice = (state = initialState.device, action) => {
  switch(action.type){
    case SELECT_DEVICE:
      return action.device;
    default:
      return state;
  }
};

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

// const devices = (state, action) => {
//   debugger;
//   switch(action.type){
//     case SELECT_DEVICE:
//       return{
//         ...state,
//         selected: true,
//       }
//     default:
//       return state;
//   }
// };

const byAddress = (state={}, action) => {
  switch(action.type){
    case DEVICE_FOUND:
      return {
        ...state,
        [action.device.address]: action.device,
      }
    default:
      // const {device} = action;
      // if(device){
      //   return {
      //     ...state,
      //     [device.deviceId]: devices(state[device.deviceId], action),
      //   };
      // }
      return state;
  }
};

const foundDevices = (state = [], action) => {
  switch(action.type){
    case DEVICE_FOUND:
      if(state.indexOf(action.device.address) === -1){
        return state.concat(action.device.address);
      }
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  byAddress,
  foundDevices,
  isScanning,
  activeDevice,
});

export const getDevice = (state, address) => state.byAddress[address];

export const getFoundDevices = state =>
  state.foundDevices.map(address => getDevice(state, address));
