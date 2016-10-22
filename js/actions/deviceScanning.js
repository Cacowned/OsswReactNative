/* @flow */
'use strict';

import type { Action, ThunkAction } from './types';
import type { Device } from '../reducers/deviceScanning';
import BleManager from '../Ble/BleManager';
import { setDevice } from '../store/storageManager';

var base64 = require('base64-js');

const osswUartUuid = '58c6000120b7490496facba8e1b95702';
const osswTXUartUuid = '58c6000220b7490496facba8e1b95702';
const batteryServiceUuid = '0000180f00001000800000805f9b34fb';
const batteryCharUuid = '00002a1900001000800000805f9b34fb';

export const STOP_SCANNING = 'STOP_SCANNING';
export const SELECT_DEVICE = 'SELECT_DEVICE';
export const START_SCANNING = 'START_SCANNING';
export const DEVICE_FOUND = 'DEVICE_FOUND';
export const REHYDRATE_DEVICE = 'REHYDRATE_DEVICE';

function getDateTimeAsBase64(){
  var d = new Date();
  var n = (d.getTime() - 60000*d.getTimezoneOffset())/1000;
  var date = new Uint8Array(5);
  date[0] = 0x10;
  date[1] = n >> 24;
  date[2] = (n >> 16) & 0xff;
  date[3] = (n >> 8) & 0xff;
  date[4] = n & 0xff;

  return base64.fromByteArray(date);
}

function connectDevice(device: Device) {
  BleManager.connect(device.address)
    .then(()=>{
      // BleManager.read(device.address, batteryServiceUuid, batteryCharUuid)
      //   .then((data)=>{
      //     console.log(data);
      //   });

      // setdatetime on connect
      BleManager.write(device.address, osswUartUuid, osswTXUartUuid, getDateTimeAsBase64())
      .then((a,b)=>{
        console.log('done');
      });
    });
}

export const selectDevice = (device: Device): ThunkAction =>{
  return (dispatch) => {

    setDevice(device);
    connectDevice(device);

    dispatch(({
      type: SELECT_DEVICE,
      device: device,
    }:any));
  };
};

export const rehydrateDevice = (device: Device): ThunkAction => {
  return(dispatch, getState) => {
    dispatch(({
      type: REHYDRATE_DEVICE,
      device: device,
    }:any));

    if(getState().settings.autoSynchronizeTime){
      connectDevice(device);
    }
  };
};

export const stopScanning = (): ThunkAction => {
  return (dispatch, getState) => {
    BleManager.stopScan();

    dispatch(({
        type: STOP_SCANNING,
    } : any));
  };
};

export const startScanning = () : ThunkAction => {
  return (dispatch : Function, getState : Function) => {
    BleManager.scan(osswUartUuid);
    dispatch({
      type: START_SCANNING,
    });
  };
};

export const deviceFound = (device: Device): Action => ({
  type: DEVICE_FOUND,
  device,
} : any);

// export const deviceFound = (device: Device) => (dispatch, getState) => {
//   dispatch(_deviceFound(device));
// };
